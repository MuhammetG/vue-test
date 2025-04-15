import { useApiConfigStore } from '@/stores/useApiConfigStore'

export function exportApiProfile(config: ReturnType<typeof useApiConfigStore>) {
  const profile = {
    provider: config.provider,
    apiUrl: config.apiUrl,
    apiKey: config.apiKey,
    environment: config.environment,
    params: config.params,
  }

  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'api-profile.json'
  link.click()
}

export function importApiProfile(file: File, config: ReturnType<typeof useApiConfigStore>) {
  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const result = event.target?.result
      if (typeof result === 'string') {
        const profile = JSON.parse(result)
        config.setConfig(profile)
      }
    } catch (err) {
      console.error('Import failed:', err)
      alert('API profili okunamadı.')
    }
  }
  reader.readAsText(file)
}
