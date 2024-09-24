export const domainValidationSchemas = {
  post: {
    bodySchema: {
      _allowedProps: ['domain', 'next'],
      domain: {
        required: true,
        type: 'string',
        regexp: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/
      },
      next: {
        required: true,
        type: 'string'
      }
    }
  }
}
