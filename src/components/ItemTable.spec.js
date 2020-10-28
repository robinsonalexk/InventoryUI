import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ItemTable from './ItemTable.vue'
import 'regenerator-runtime/runtime'


const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('ItemTable', () => {
    test('init', () => {
        const wrapper = mount(ItemTable, {
            localVue,
            propsData: {
                items: [{
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                },
                {
                    id: 2,
                    itemName: 'TEST2',
                    cost: 30
                }]
            }
        })
        expect(true).toBe(true);
    })

    test('Check Props', () => {
        const wrapper = mount(ItemTable, {
            localVue,
            propsData: {
                items: [{
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                },
                {
                    id: 2,
                    itemName: 'TEST2',
                    cost: 30
                }]
            }
        })
        expect(wrapper.props().items).toEqual([{id: 1, itemName: 'TEST', cost: 20},{id: 2,itemName: 'TEST2',cost: 30}])
    })

    test('Check Toggle Edit', () => {
        const wrapper = mount(ItemTable, {
            localVue,
            propsData: {
                items: [{
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                },
                {
                    id: 2,
                    itemName: 'TEST2',
                    cost: 30
                }]
            }
        })

        wrapper.find("#addItemToggleButton").trigger("click")
        expect(wrapper.vm.toggleAddItem).toBe(true);

        wrapper.find("#addItemToggleButton").trigger("click")
        expect(wrapper.vm.toggleAddItem).toBe(false);
    })
 })