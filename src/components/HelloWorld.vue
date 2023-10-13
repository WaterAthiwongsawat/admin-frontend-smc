<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h1>ยินดีต้อนรับสู่ ชมรม SMC</h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h3>ภาพกิจกรรมของชมรม SMC</h3>
        </v-col>
        <v-col cols="12" sm="6" md="100" class="centered-container">
          <v-carousel cycle min-height="50vh" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-img :src="item.src" class="image-frame"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      items: [
        {
          src: require('@/assets/picture/photo1.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo2.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo3.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo4.jpg') // Adjust the path based on your project structure
        }
      ]
    }
  }
}
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.image-frame {
  border: 2px solid #000; /* เปลี่ยนสีกรอบตามความต้องการ */
  padding: 0px; /* เพิ่มระยะห่างระหว่างรูปและกรอบตามความต้องการ */
  margin: 0px; /* เพิ่มระยะห่างระหว่างกรอบแต่ละรูปตามความต้องการ */
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0); /* เพิ่มเงาให้รูป */
  border-radius: 4px;
  width: 2000px; /* กำหนดความกว้างให้รูปเท่ากับความกว้างของคอลัมน์ */
  height: 100%; /* กำหนดความสูงให้รูปเท่ากับความสูงของคอลัมน์ */
  object-fit: cover; /* จัดการการปรับขนาดของรูปให้ครอบคลุมพื้นที่ที่กำหนดไว้ */
}
</style>
