import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import MaxPriceBar from './MaxPriceBar.vue'


const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('MaxPriceBar', () => {
    test('init', () => {
        const wrapper = mount(MaxPriceBar, {
            localVue
        })
        expect(true).toBe(true);
    })

    test('Check Search Value', () => {
        const wrapper = mount(MaxPriceBar, {
            localVue
        })
        wrapper.setData({itemname: "Test Value"})
        expect(wrapper.vm.itemname).toBe("Test Value");
    })

    test('Check Search Event', () => {
        const wrapper = mount(MaxPriceBar, {
            localVue
        })
        wrapper.setData({itemname: "Test Value"})
        wrapper.find("#searchButton").trigger("click")

        expect(wrapper.emitted('search-item-max-price')).toBeTruthy()
        expect(wrapper.emitted('search-item-max-price')[0][0]).toBe("Test Value")
    })

    test('Check Get All Event', () => {
        const wrapper = mount(MaxPriceBar, {
            localVue
        })

        wrapper.find("#getAllButton").trigger("click")
        expect(wrapper.emitted('get-all-max-priced')).toBeTruthy()
    })
})