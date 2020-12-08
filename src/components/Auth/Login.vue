<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2
          .auth__form
            span.ui-title-2 Вход
            form(@submit.prevent="onSubmit")

              .form-item(:class="{ errorInput: $v.email.$error }")
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ error: $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Введите адрес электронной почты!
                .error(v-if="!$v.email.email") Введён некорректный адрес!

              .form-item(:class="{ errorInput: $v.password.$error }")
                input(
                  type="password"
                  placeholder="Введите пароль (не менее 6 символов)"
                  v-model="password"
                  :class="{ error: $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Введите пароль!
                .error(v-if="!$v.password.minLength")
                  | Минимальная длина пароля: {{ $v.password.$params.minLength.min }} символов.

              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                )
                  span(v-if="loading") Авторизация...
                  span(v-else) Вход

              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Спасибо за регистрацию!
                p.typo__p(v-if="submitStatus === 'ERROR'") Пожалуйста, заполните форму!
                p.typo__p(v-else) {{ submitStatus }}
                // p.typo__p(v-if="submitStatus === 'PENDING'") Отправка данных...

              .buttons-list.buttons-list--info
                span Требуется регистрирация?
                  router-link(to="/registration")  Жмите сюда!
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            console.log('LOGINING!!!')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    // Show loading status
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
//@import './assets/stylus/main.styl'
.auth
  display flex
  flex-wrap wrap
.auth__banner,
.auth__form
  width 50%
  @media screen and (max-width: 768px)
    width 100%
    margin-bottom 30px
    &:last-child
      margin-bottom 0px

.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block

input
  &.error
    border-color #fc5c65
    animation shake .3s
.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0
a
  color #444ce0

</style>
