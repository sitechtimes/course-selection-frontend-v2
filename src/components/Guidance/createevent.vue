<template>
  <div class="event h-screen w-full flex flex-column mt-20">
    <div v-if="hidee" class="createevent h-screen flex flex-row m-auto mt-5">
      <div class="event">
        <div class="top">
          <h2 class="m-8 font-bold">Create Event</h2>
          <svg
            @click="hidee = !hidee"
            class="x"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
            />
          </svg>
        </div>

        <form @submit.prevent="createevent">
          <div class="item">
            <label class="formt" for="title">Title </label>
            <input
              class="space"
              type="text"
              v-model="title"
              placeholder="Title"
            />
          </div>
          <div class="item">
            <label class="formt" for="date">
              Date
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                /></svg
            ></label>
            <input
              class="space"
              type="date"
              v-model="date"
              placeholder="Date"
            />
          </div>
          <div class="item">
            <label class="formt" for="emails">
              Notify People
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
            </label>
            <input
              class="space"
              type="email"
              v-model="people"
              placeholder="Notify People"
            />
          </div>
          <div class="item">
            <label class="formt" for="description"> Description </label>
            <input
              class="space"
              type="text"
              v-model="description"
              placeholder="Description"
            />
          </div>
          <div class="item submit">
            <button @click="submit" type="submit" class="btn font-bold">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const hidee = true;
</script>
<style scoped>
.event {
  display: flex;
  flex-direction: column;
}
button {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}
button:hover {
  opacity: 0.5;
}
.top {
  display: flex;
  flex-direction: row;
}
.x {
  margin-left: 34rem;
  fill: #37394f;
  transition: 0.3s;
  margin-top: 1rem;
}
.x:hover {
  opacity: 0.8;
  cursor: pointer;
}
svg {
  width: 1.2rem;
  margin-left: 5px;
  fill: #717494;
}
.submit:hover {
  opacity: 0.5;
  cursor: pointer;
}
.item {
  margin-top: 1.5rem;
}
.submit {
  margin-left: 2rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  transition: 0.3s;
}
.space {
  justify-content: center;
  padding: 1rem;
  margin-left: 2rem;
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding-left: 0.7rem;
  height: 0rem;
}
.form {
  text-align: left;
}
.formt {
  display: flex;
  flex-direction: row;
  color: #717494;
  margin-left: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.createevent {
  width: 70%;
  height: 35rem;
  border-radius: 1rem;
  margin-top: 8rem;
  border: 1px black solid;
}
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

@media only screen and (max-width: 1180px) {
  .createevent {
    width: 70%;
    height: 30rem;
    border-radius: 0.8rem;
    margin-top: 3rem;
    border: 1px black solid;
  }
  .space {
    justify-content: center;
    padding: 1rem;
    margin-left: 2rem;
    display: block;
    width: 20rem;

    border-radius: 0.4rem;
    font-size: 1.2rem;
    padding-left: 0.7rem;
    height: 0rem;
  }
  .x {
    margin-left: 30rem;
  }
  svg {
    width: 1rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .formt {
    font-size: 1.3rem;
  }
  button {
    font-size: 1.3rem;
  }
  .item {
    margin-top: 0.8rem;
  }
}
@media only screen and (max-width: 800px) {
}
@media only screen and (max-width: 670px) {
}
@media only screen and (max-width: 604px) {
}
</style>
