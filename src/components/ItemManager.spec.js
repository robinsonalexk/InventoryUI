import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'regenerator-runtime/runtime'
import ItemManager from './ItemManager.vue'
import axios from 'axios'


const localVue = createLocalVue()

jest.mock("axios", () => ({
        get: () => Promise.resolve({ 
            data: [
                    {
                        id: 1,
                        itemName: "TEST 1",
                        cost: 20
                    },
                    {
                        id: 2,
                        itemName: "TEST 2",
                        cost: 10
                    },
                    {
                        id: 3,
                        itemName: "TEST 3",
                        cost: 30
                    }
                ]})
        }));

localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('ItemManager', () => {
    test('init', () => {
        const wrapper = mount(ItemManager, {
            localVue
        })
        expect(true).toBe(true);
    })

    test('Check getAllItems Function', async () => {
        const wrapper = mount(ItemManager, {
            localVue
        })

        await wrapper.vm.getAllItems();
        expect(wrapper.vm.items).toEqual([
            {
                id: 1,
                itemName: "TEST 1",
                cost: 20
            },
            {
                id: 2,
                itemName: "TEST 2",
                cost: 10
            },
            {
                id: 3,
                itemName: "TEST 3",
                cost: 30
            }
          ])
    })

    test('Check getMaxPrices Function', async () => {
        const wrapper = mount(ItemManager, {
            localVue
        })

        await wrapper.vm.getMaxPrices();
        expect(wrapper.vm.items).toEqual([
            {
                id: 1,
                itemName: "TEST 1",
                cost: 20
            },
            {
                id: 2,
                itemName: "TEST 2",
                cost: 10
            },
            {
                id: 3,
                itemName: "TEST 3",
                cost: 30
            }
          ])
    })

    test('Check searchMaxPrices Function', async () => {
        const wrapper = mount(ItemManager, {
            localVue
        })

        await wrapper.vm.searchItem();
        expect(wrapper.vm.items).toEqual([
            [{
                id: 1,
                itemName: "TEST 1",
                cost: 20
            },
            {
                id: 2,
                itemName: "TEST 2",
                cost: 10
            },
            {
                id: 3,
                itemName: "TEST 3",
                cost: 30
            }]
          ])
    })

    test('Check addItem Function', async () => {
        const wrapper = mount(ItemManager, {
            localVue
        })

        await wrapper.vm.addItem();
        expect(wrapper.vm.item).toEqual([
            {
                id: 1,
                itemName: "TEST 1",
                cost: 20
            }
          ])
    })
    
})