<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth'
  })

  const {
  status,
  data,
  getSession,
  signOut
} = useAuth()

const session = await getSession()
</script>

<template>
  <div>
    <h1>Admin page</h1>
    {{ status }}
    {{ data }}
    {{ session }}

    <button @click="() => {signOut()}">Sign out</button>
  </div>
</template>
