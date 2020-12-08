<template lang="pug">
  .content-wrapper
    section
      .container
        .machine-list__header
          h1.ui-title-2 Производство
    section
      .container
        .buttons-list
          .button.button--round.button-primary(
            @click="showblock = !showblock"
          )
            span(v-if="showblock") Кратко
            span(v-else) Подробно...
          //- .button.button--round.button-primary(
          //-   @click="runDistribution"
          //- )
          //-   span Обновить
            //- .button.button--round.button-primary(
            //-   @click="showblock = true"
            //- ) Подробно
            //- .button.button--round.button-primary(
            //-   @click="filter = 'all'"
            //- ) Все
            //- .button.button-default(
            //-   @click="loadActivities"
            //- ) Обновить
        .machine-list
          //- ul
          //-   each val, index in ['zero', 'one', 'two']
          //-     li= index + ': ' + val
          .machine-item(
            v-for="machine in machinesFilter"
            :key="machine.id"
          )
            .ui-card.ui-card--shadow
              .ui-card__header
                .machine-item__title.ui-title-4
                  span {{ machine.title }}
                .machine-item__image
                  img(
                    :src='machine.image'
                  )
              .ui-card__body
              .comment-item(
                v-for="comment in activeComments"
                :key="comment.id"
              )
                .comment-current-item(
                  v-for="item in comment.com"
                )
                  p(
                    v-if="comment.id === machine.id"
                  ) {{ item.com }}
                    .products-item(
                      v-for="product in activeProducts"
                    )
                      .products-current-item-array(
                        v-if="product.id === machine.id & product.id === comment.id & product.com === item.com"
                      )
                        ul
                          li(
                            v-for="item in product.products"
                          ) {{ item }}
                            .operations-item(
                              v-for="operations in activeOperations"
                              :class="{active: showblock}"
                            )
                              .operations-current-item-array(
                                v-if="showblock === true & operations.products === item & operations.id === product.id & operations.com === product.com"
                              )
                                .operations-class(
                                  v-for="items2 in operations.operations"
                                )
                                  .operation-current {{ items2.operation }}
                                  .activities-item(
                                    v-for="activity in activeActivities"
                                  )
                                    .activities-current-item(
                                      v-if="activity.operation === items2.operation & activity.product === operations.products & activity.id === operations.id & activity.com === operations.com"
                                    )
                                        .ui-tag__wrapper
                                          .ui-tag.bg-my-danger
                                            span.tag-title {{ activity.start }}
                                        .ui-tag__wrapper
                                          .ui-tag.bg-success
                                            span.tag-title {{ activity.finish }}
                                        .ui-tag__wrapper
                                          .ui-tag.bg-warning
                                            span.tag-title {{ activity.balance }}

</template>

<script>
export default {
  data () {
    return {
      // showblock: true
      showblock: false
      // filter: 'all'
      // commArr: []
    }
  },
  computed: {
    machinesFilter () {
      return this.$store.getters.machines
      // if (this.filter === 'active') {
      //   return this.$store.getters.machinesNotCompleted
      // } else if (this.filter === 'completed') {
      //   return this.$store.getters.machinesCompleted
      // } else if (this.filter === 'all') {
      //   return this.$store.getters.machines
      // }
      // return this.filter === 'active'
    },
    activeComments () {
      return this.$store.getters.comments
    },
    activeProducts () {
      return this.$store.getters.products
    },
    activeOperations () {
      return this.$store.getters.operations
    },
    activeActivities () {
      return this.$store.getters.activity
    }
  },
  methods: {
    // async runDistribution () {
    //   await this.$store.dispatch('newDistribution')
    //   this.$store.dispatch('newWorkDistribution')
    //   this.$store.dispatch('loadActivities')
    // },
    runDistribution () {
      // await this.$store.dispatch('newDistribution')
      // this.$store.dispatch('newWorkDistribution')
      this.$store.dispatch('loadActivities')
    },
    loadActivities () {
      this.$store.dispatch('loadActivities')
    }
  }
}
</script>

<style lang="stylus" scoped>
// section
//   display flex
//   justify-content space-between
//   align-items center
.content-wrapper
  section
    padding 5px
  .container
    padding-right 5px
    padding-left 5px

.machine-list__header
  display flex
  justify-content space-between
  align-items center
  //margin-bottom 30px
  .button
   margin-right 8px
  .ui-title-2
    margin-bottom 0px

.machine-item
  margin-bottom 20px
  &:last-child
    margin-bottom 0px

.ui-card.ui-card--shadow
  //display flex
  justify-content space-between
  align-items center
  padding 20px

.comment-current-item
  p
    // justify-content space-between
    // align-items center
    color Red

.products-current-item-array
  // justify-content space-between
  // align-items center
  color blue

.operations-current-item-array
  color green

.operations-class
  display flex
  justify-content flex
  align-items center

.operations-item
  display none
  // visibility: hidden
  &.active
    display block
    margin-left 10px
    margin-top 3px
    margin-bottom 3px

// .activities-current-item
//   display none
//   // visibility: hidden
//   &.active
//     display block
//     margin-left 10px
//     margin-top 3px
//     margin-bottom 3px
    // justify-content space-between
    // align-items center
.ui-tag__wrappe
  display flex
  justify-content space-between
  margin 100px
  span
    color red

.buttons-list
  display flow
  justify-content space-evenly
  align-items center
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  padding-left 60%
  .button.button--round.button-primary
    margin-bottom 5px
    margin-right 50px
    &:last-child
      margin-bottom 20px

.activities-item
  // margin 0px
  // padding 0.000000006667rem
ul, li
  margin: 10px
  list-style-type disc

.bg-my-danger
  background-color #fc5c6591

.ui-tag__wrapper
  margin-left 10px
  margin-top 7px

</style>
