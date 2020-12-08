<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2
          .auth__form
            span.ui-title-2 Регистрация
            form(@submit.prevent="onSubmit")

              .form-item(:class="{ errorInput: $v.barcode.$error }")
                input(
                  type="number"
                  placeholder="Введите персональный идентификатор"
                  v-model="barcode"
                  :class="{ error: $v.barcode.$error }"
                  @change="$v.barcode.$touch()"
                )
                .error(v-if="!$v.barcode.required") Введите идентификатор!
                .error(v-if="!$v.barcode.minLength")
                  | Минимальная длина идентификатора: {{ $v.barcode.$params.minLength.min }} цифр.

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

              .form-item(:class="{ errorInput: $v.repeatPassword.$error }")
                input(
                  type="password"
                  placeholder="Повторите пароль"
                  v-model="repeatPassword"
                  :class="{ error: $v.repeatPassword.$error }"
                  @change="$v.repeatPassword.$touch()"
                )
                .error(v-if="!$v.repeatPassword.sameAsPassword") Пароль продублирован неверно!

              .buttons-list
                button.button.button-primary(
                  type="submit"
                )
                  span(v-if="loading") Регистрация...
                  span(v-else) Зарегистрировать

              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Спасибо за регистрацию!
                p.typo__p(v-if="submitStatus === 'ERROR'") Пожалуйста, заполните форму!
                p.typo__p(v-else) {{ submitStatus }}
                //p.typo__p(v-if="submitStatus === 'PENDING'") Отправка данных...

              .buttons-list.buttons-list--info
                span Вы уже зарегистрированы?
                  router-link(to="/login")  Жмите сюда!
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      barcode: '',
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    barcode: {
      required,
      minLength: minLength(13)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          barcode: this.barcode,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            console.log('REGISTER!')
            console.log(user)
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
