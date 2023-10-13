<template>
<div>
    <v-data-table :headers="headers" :items="studentDataItem" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>หน้าจัดผู้ใช้งานทั้งหมด</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn small outlined @click="openDialog('edit', item)" color="blue">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-btn small outlined @click="deleteItem(item)" color="red" class="ml-2">
                <v-icon>
                    mdi-delete
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:no-data>
            ไม่มีผู้ใช้งาน
        </template>
    </v-data-table>
    <!-- <v-dialog v-model="dialogCreate" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-select v-model="room_id" :items="roomOptions" label="ห้องที่จอง" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-date-picker v-model="reserve_date" label="วันที่" required :min="minDate"></v-date-picker>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-select v-model="reserve_time" :items="timeSlots" label="ช่วงเวลา" required></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="save(formTitle)">
                    บันทึกข้อมูล
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">คุณต้องการลบข้อมูลนี้ในตารางใช่ หรือ ไม่?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">ตกลง</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  data: () => ({
    dialogCreate: false,
    dialogDelete: false,
    headers: [{
      text: 'ลำดับ',
      align: 'start',
      sortable: false,
      value: 'id'
    },
    {
      text: 'รหัสนักศึกษา',
      align: 'start',
      sortable: false,
      value: 'studentId'
    },
    {
      text: 'ชื่อ',
      value: 'name'
    },
    {
      text: 'นามสกุล',
      value: 'surname'
    },
    {
      text: 'Email',
      value: 'email'
    },
    {
      text: 'จัดการ',
      value: 'actions',
      sortable: false
    }
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    formTitle: '',
    idstudent: '',
    idforDelete: ''
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    async initialize () {
      this.studentDataItem = []
      try {
        const data = await this.axios.get('http://localhost:8081/students')
        console.log('Data received:', data)
        this.studentDataItem = data.data
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },

    openDialog (Action, item) {
      this.formTitle = ''
      if (Action === 'add') {
        this.dialogCreate = true
        this.formTitle = 'เพิ่มข้อมูล'
        this.editedItem = item
        this.studentId = ''
        this.name = ''
        this.surname = ''
        this.email = ''
        this.idstudent = ''
      } else {
        this.formTitle = 'แก้ไขข้อมูล'
        this.dialogCreate = true
        this.studentId = item.studentId
        this.name = item.name
        this.surname = item.surname
        this.email = item.email
        this.idstudent = item.id
      }
    },

    editItem (item) {
      console.log('item select', item)
      this.editedIndex = this.studentDataItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.idforDelete = item.reserve_id
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await this.axios.delete('http://localhost:8081/student/' + this.idforDelete)
        this.initialize()
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
      this.closeDelete()
    },

    close () {
      this.dialogCreate = false
      this.editedItem = {}
      this.editedIndex = -1
      this.defaultItem = {}
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (action) {
      const data = {
        studentId: this.studentId,
        name: this.name,
        surname: this.surname,
        email: this.email
      }
      if (action === 'เพิ่มข้อมูล') {
        try {
          var dataResponse = await this.axios.post('http://localhost:8081/students', data)
          console.log('dataResponse ====>', dataResponse)
          this.close()
          this.initialize()
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          dataResponse = await this.axios.put('http://localhost:8081/students/' + this.idstudent, data)
          console.log('dataResponse edit ====>', dataResponse)
          this.close()
          this.initialize()
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }
}
</script>

<style>
  </style>
