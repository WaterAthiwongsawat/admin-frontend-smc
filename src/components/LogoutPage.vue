<template>
    <div>
      <v-card>
        <!-- ... Your existing code ... -->
      </v-card>
      <v-btn color="error" @click="logout" block>
        ออกจากระบบ
      </v-btn>
    </div>
  </template>

<script>
export default {
  // ... Your existing code ...

  methods: {
    // ... Your existing methods ...

    logout () {
      // Perform logout actions here, e.g., clearing authentication token or session.
      // You can also redirect the user to a logout page or home page.

      // For example, if you're using localStorage to store authentication tokens:
      localStorage.removeItem('authToken')

      // Redirect the user to the login page or any other appropriate page.
      this.$router.push('/login') // Replace with your desired route.

      alert('ออกจากระบบสำเร็จ')
    }
  }
}
</script>

  <style>
  </style>
