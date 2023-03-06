<script setup lang="ts">
import backbutton from '../../components/backbutton.vue';
</script>

<template>
    <body>
      <div id="logincontainer">
        <div id="logindisplay">
          <h1 class="mt-40 text-4xl font-bold text-center">Guidance</h1>
          <backbutton class="text-2xl m-auto w-60 p-5 font-bold text-center mt-20 transition duration-300 bg-[#edfbe2] hover:bg-[#a8d480]"/>
        </div>
        <div id="login">
          <h3 class="mt-16 text-4xl font-semibold text-center">Login</h3>
          <button id="googlesignin">
            <div class="inner">
              <svg
                class="google"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
              <span class="font-bold text-1xl ml-2"> Sign in with Google</span>
            </div>
          </button>
          <h2 class="text-xl mb-4 text-center">or</h2>
          <div id="emailsection">
            <label class="text-2xl mt-4 block font-bold" for="email">Email</label>
            <input class="w-96 input p-2" type="email" name="email" id="email" />
          </div>
          <div id="passwordsection">
            <label class="text-2xl mt-4 block font-bold" for="password"
              >Password</label
            >
            <input
              class="w-96 input p-2"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <h3 class="text-right mr-28 mt-1 font-bold">Forgot Password?</h3>
          <button id="loginbutton">Login</button>
        </div>
      </div>
    </body>
  </template>

  <style scoped>
  .inner {
    display: flex;
    flex-direction: row;
  }
  .google {
    width: 1rem;
    fill: #282828;
  }
  #logincontainer {
    width: 80%;
    margin: auto;
    margin-top: 5%;
    height: 45rem;
    border-radius: 1rem;
    display: flex;
    border: solid #c5d4a4 1rem;
  }
  #logindisplay {
    text-align: center;
    border-right: solid #000000 0.11rem;
    flex: 50%;
  }
  #login {
    flex: 50%;
  }
  .input {
    width: 80%;
    border: solid black 1px;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
  #loginbutton:hover {
    background-color: #e0ecc5;
  }
  #loginbutton {
    transition: 0.3s;
    font-size: 1.2rem;
    color: white;
    font-weight: bolder;
    width: 8rem;
    margin: 2rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    padding: 0.5rem;
    margin-left: 65%;
    background-color: #99b76f;
    text-align: center;
  }
  .BackButton {
    margin-top: 5rem;
    transition: 0.3s;
  }
  .BackButton:hover {
    background-color: #a8d480;
  }
  #googlesignin {
    transition: 0.3s;
    color: #282828;
    padding: 1rem;
    margin: auto;
    display: block;
    flex-direction: row;
    margin-top: 5%;
    margin-bottom: 1rem;
    background-color: #edfbe2;
  }
  #emailsection {
    margin-left: 22%;
  }
  #passwordsection {
    margin-left: 22%;
  }
  </style>