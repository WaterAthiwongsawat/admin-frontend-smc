<template>
    <div>
      <v-data-table :headers="headers" :items="reserveroomItem" class="elevation-1">
          <template v-slot:top>
              <v-toolbar flat>
                  <v-toolbar-title>หน้าจัดการข้อมูลห้องซ้อม</v-toolbar-title>
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
              ไม่มีรายการ การจอง
          </template>
      </v-data-table>
      <v-dialog v-model="dialogCreate" max-width="500px">
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
      </v-dialog>
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
import EventBus from './EventBus'
/* eslint-disable */
  export default {
      data: () => ({
          roomOptions: ['1', '2', '3'],
          minDate: new Date().toISOString().substr(0, 10),
          timeSlots: [
        '17.00 - 18.20',
        '18:20 - 19:40',
        '19.40 - 21.00',
        '21:00 - 22:20',
        '22.20 - 23.40'

          ],
          reserveroom_id: '',
          room_id: '',
          studentId: '',
          reserve_date: '',
          reserve_time: '',
          dialogCreate: false,
          dialogDelete: false,
          headers: [{
                  text: 'ลำดับการจอง',
                  align: 'start',
                  sortable: false,
                  value: 'reserve_id'
              },
              {
                  text: 'รหัสนักศึกษาผู้ที่ทำการจอง',
                  align: 'start',
                  sortable: false,
                  value: 'student_id'
              },
              {
                  text: 'ห้องที่ทำการจอง',
                  value: 'room_id'
              },
              {
                  text: 'วันที่จอง',
                  value: 'reserve_date'
              },
              {
                  text: 'เวลาที่จอง',
                  value: 'reserve_time'
              },
              {
                  text: 'จัดการ',
                  value: 'actions',
                  sortable: false
              }
          ],
          reserveroomItem: [],
          editedIndex: -1,
          editedItem: {},
          defaultItem: {},
          formTitle: '',
          idreserveroom: '',
          idforDelete: ''
      }),
  
      watch: {
          dialog(val) {
              val || this.close()
          },
          dialogDelete(val) {
              val || this.closeDelete()
          }
      },
  
      created() {
          this.initialize()
          EventBus.$on('booking-made', (bookingData) => {
              console.log('Booking made:', bookingData);
              // คุณสามารถเพิ่มโค้ดเพื่อบันทึกข้อมูลการจองลงใน reserveroomItem หรือทำการจัดเก็บข้อมูลตามที่คุณต้องการ
          })
      },
  
      methods: {
          async initialize() {
              this.reserveroomItem = []
              try {
                  const data = await this.axios.get('http://localhost:8081/reservehistory')
                  console.log('data reserveroom ====>', data)
                  this.reserveroomItem = data.data
              } catch (error) {
  
              }
          },
          openDialog(Action, item) {
              this.formTitle = '';
              if (Action === 'add') {
                  this.dialogCreate = true;
                  this.formTitle = 'เพิ่มข้อมูล';
                  this.editedItem = item;
                  this.room_id = ''; // Clear the room_id when adding a new item
              } else {
                  this.formTitle = 'แก้ไขข้อมูล';
                  this.dialogCreate = true;
                  this.reserve_id = item.reserve_id;
                  this.room_id = item.room_id; // Set room_id to the room associated with the item
                  this.reserve_date = item.reserve_date;
                  this.reserve_time = item.reserve_time;
                  this.idreserveroom = item.reserve_id;
              }
          },
  
          editItem(item) {
              console.log('item select', item)
              this.editedIndex = this.reserveroomItem.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.dialog = true
          },
  
          deleteItem(item) {
              this.idforDelete = item.reserve_id
              this.dialogDelete = true
          },
  
          async deleteItemConfirm() {
              try {
                  const response = await this.axios.delete('http://localhost:8081/reserveroom/' + this.idforDelete)
                  this.initialize()
              } catch (error) {
                  console.log(error.message)
              }
              this.closeDelete()
          },
  
          close() {
              this.dialogCreate = false
              this.editedItem = {}
              this.editedIndex = -1
              this.defaultItem = {}
          },
  
          closeDelete() {
              this.dialogDelete = false
              this.$nextTick(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = -1
              })
          },
  
          async save(action) {
              const data = {
                  reserve_id: this.reserve_id,
                  room_id: this.room_id,
                  user_id: this.user_id,
                  reserve_date: this.reserve_date,
                  reserve_time: this.reserve_time,
  
              }
              if (action === 'เพิ่มข้อมูล') {
                  try {
                      var dataResponse = await this.axios.post('http://localhost:8081/reserveroom', data)
                      console.log('dataResponse ====>', dataResponse)
                      this.close()
                      this.initialize()
                  } catch (error) {
                      console.log(error.message)
                  }
              } else {
                  try {
                      var dataResponse = await this.axios.put('http://localhost:8081/reserveroom/' + this.idreserveroom, data)
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
  