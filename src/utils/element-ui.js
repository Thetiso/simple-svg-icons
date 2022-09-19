import {
    Button,Card, Loading , Scrollbar, Icon, select, Option,
} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Button)
        Vue.use(Card)
        Vue.use(Loading)
        Vue.use(Scrollbar)
        Vue.use(Icon)
        Vue.use(select)
        Vue.use(Option)
    }
}
export default element