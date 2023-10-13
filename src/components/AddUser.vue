<template>
    <v-card>
      <v-card-title>เพิ่มผู้ใช้และรหัสผ่านใหม่</v-card-title>
      <v-card-text>
        <v-form ref="AddUserForm">
          <v-text-field
            v-model="newUser.username"
            label="ชื่อผู้ใช้งานใหม่"
            required
            outlined
          ></v-text-field>

        <v-text-field
            v-model="newUser.password"
            label="รหัสผ่านใหม่"
            required
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="addUser">เพิ่มผู้ใช้</v-btn>
      </v-card-actions>
    </v-card>
  </template>
<script>
export default {
  data: () => ({
    newUser: {
      username: '',
      password: ''
    }
  }),
  methods: {
    addUser () {
    // เพิ่มข้อมูลผู้ใช้ใหม่ลงในอาร์เรย์ users และล้างฟอร์ม
      this.users.push({ username: this.newUser.username, password: this.newUser.password })
      this.newUser.username = ''
      this.newUser.password = ''
      alert('เพิ่มผู้ใช้สำเร็จ')
    }
  }
}

</script>
