const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = process.env.REACT_APP_API_ENDPOINT
// console.log(process.env.REACT_APP_API_ENDPOINT)
// console.log(process.env.NODE_ENV)

export const getTodos = () => {
  return (
    fetch(baseUrl)
    .then(res => {
      return res.json()
    })
  )
}

export const createTodo = name => {
  return (
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, isComplete: false})
    })
    .then(res => res.json())
  )
}

export const updateTodo = todo => {
  return (
    fetch(`${baseUrl}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
  )
}

export const destroyTodo = id => {
  return (
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  )
}