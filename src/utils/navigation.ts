import type { NavigateFunction, To } from 'react-router-dom'

export function canNavigateBack() {
  return Number(window.history.state?.idx ?? 0) > 0
}

export function navigateBackOr(navigate: NavigateFunction, fallback: To) {
  if (canNavigateBack()) {
    navigate(-1)
    return
  }

  navigate(fallback)
}
