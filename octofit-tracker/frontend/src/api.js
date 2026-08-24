import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results
  return []
}

export function useCollection(resource) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let active = true

    async function loadCollection() {
      try {
        const response = await fetch(`${apiBaseUrl}/${resource}/`)
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const payload = await response.json()
        if (active) setState({ items: getItems(payload), loading: false, error: '' })
      } catch (error) {
        if (active) setState({ items: [], loading: false, error: error.message })
      }
    }

    loadCollection()
    return () => {
      active = false
    }
  }, [resource])

  return state
}