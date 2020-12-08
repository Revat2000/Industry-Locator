<template lang="pug">
  .content-wrapper
    section
      .container
        .navbar-content__user(
            :class="{active: showUser}"
          )
            span.user-logo Текущий пользователь:   {{ userFio }}
        .jobs-header
          h1.ui-title-2 Выполненная работа
        .jobs-form
          form(@submit.prevent="onSubmit")
            .form-item
              span Начало периода:
              input(
                type="date"
                v-model="startDate"
              )
            .form-item
              span Конец периода:
              input(
                type="date"
                v-model="endDate"
              )
            .buttons-list
              button.button--plain.button-primary(
                type="submit"
              )
                span Показать
        .user-label
          .user-fio
            h1.ui-title-4 Выработка сотрудника за период  с  {{ startDate }}  по  {{ endDate }}
        .jobs-body
          table.ui-table.ui-table--hover
            thead
              tr
                th
                  span  Д а т а
                th
                  span И з д е л и е
                th
                  span О п е р а ц и я
                th
                  span Шт.
            tbody
              tr(
                v-for="item in userJob"
              )
                td
                  span.ui-text-regular {{ item.date }}
                td
                  span.ui-text-regular {{ item.product }}
                td
                  span.ui-text-regular {{ item.operation }}
                td
                  span.ui-text-regular {{ item.finish }}
</template>

<script>
export default {
  data () {
    return {
      showUser: true,
      startDate: '',
      endDate: '',
      userID: ''
    }
  },

  computed: {
    userJob () {
      return this.$store.getters.userJobs
    },
    userFio () {
      return this.$store.getters.userFio
    }
  },

  methods: {
    async onSubmit () {
      const periodAndID = {
        startDate: this.startDate,
        endDate: this.endDate,
        userID: this.$store.getters.userID
      }
      // eslint-disable-next-line
      await this.$store.dispatch('completedWork', periodAndID)
      if (this.startDate > this.endDate) {
        console.log('Первая дата больше второй')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar-content__user
  display none
  &.active
    display flex
    justify-content center
    // align-items center
    font-family 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    color #6666ff
    max-width: 20em; /* блок занимает ширину родителя, max-width её ограничивает */
    // min-height: 2em
    margin-left: auto
    margin-right: 0em
    border: 1px solid #6666ff
    padding 3px
    background: #f2f2f2

.form-item
  display flex
  flex-wrap wrap
  width 50%
  justify-content space-between
@media screen and (max-width: 768px)
  width 100%
  margin-bottom 30px
  &:last-child
    margin-bottom 0px

.user-label
  margin-bottom 10px
  margin-top 10px

.jobs-body
  display flex
  flex-wrap wrap

// .wrapper-table
//   display flexbox
//   flex-wrap wrap-reverse
//   padding 0px
//   margin 0px
//   .date-header
//     width 10px
//     padding 0px
//     margin 0px
//   .product-header
//     width 50px
//   .operation-header
//     width 35px
//   .finish-header
//     width 5px
</style>
