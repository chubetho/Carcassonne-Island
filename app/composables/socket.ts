import type { SendPayload } from '#shared/types'

export function useSocket() {
  const { open, data, send: _send, status } = useWebSocket('/ws', {
    immediate: false,
  })

  const send = (payload: SendPayload) => {
    const data = JSON.stringify(payload)
    _send(data)
  }

  const event = createEventHook<string>()

  watch(data, async (d) => {
    if (typeof d === 'string') {
      event.trigger(d)
      return
    }

    if (d instanceof Blob) {
      const text = await (d as Blob).text()
      event.trigger(text)
      return
    }

    console.error(d)
  })

  return { open, send, onData: event.on, status }
}
