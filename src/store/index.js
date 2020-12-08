import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import user from './user'
import distribution from './distribution'
import workDistribution from './workDistribution'
import activity from './activity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    distribution,
    workDistribution,
    activity
  }
})
