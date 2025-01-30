import type { SendPayload } from '#shared/types'

export function useSocket() {
  const { open, data: _data, send: _send, status } = useWebSocket('/ws', {
    immediate: false,
  })

  const send = (payload: SendPayload) => {
    const data = JSON.stringify(payload)
    _send(data)
  }

  const data = computedAsync(async () => {
    if (typeof _data === 'string')
      return _data as string

    if (_data instanceof Blob) {
      return await (_data as Blob).text()
    }
  })

  return { open, send, data, status }
}
