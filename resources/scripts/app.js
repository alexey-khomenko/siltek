import 'alpinejs';
window.calculatorData = function () {
    return {
        step: 1,
        calculated: false,
        loading: false,

        product: 0,
        products: [],
        color: 0,
        colors: [],
        pack: 0,
        packs: [],
        base: '',

        photo: '',
        pigments: [],
        pigments_price: 0,
        pigments_price_up: 0,
        pigments_price_amount: 0,
        base_price: 0,
        base_discount: '0.0',
        base_amount: 0,
        amount: 0,

        discount: {
            ["@input.debounce"](){
                this.calculateDiscount();
            },
            ["@paste.debounce"](){
                this.calculateDiscount();
            },
        },

        calculateDiscount: function () {
            this.base_discount = parseFloat(+this.base_discount).toFixed(1);
            this.base_amount = parseFloat((+this.base_price) - (+this.base_price) * (+this.base_discount) / 100).toFixed(2);
            this.amount = parseFloat((+this.base_amount) + (+this.pigments_price_amount)).toFixed(2);
        },

        loadProducts: async function () {
            const mode = 'products';

            this.product = 0;
            this.products = [];
            this.color = 0;
            this.colors = [];
            this.pack = 0;
            this.packs = [];
            this.base = '';
            this.cleanStep2();

            this.products = await this.load(mode);
        },

        loadColors: async function () {
            const mode = 'colors';

            this.color = 0;
            this.colors = [];
            this.pack = 0;
            this.packs = [];
            this.base = '';
            this.cleanStep2();

            this.colors = await this.load(mode);
        },

        loadPacks: async function () {
            const mode = 'packs';

            this.pack = 0;
            this.packs = [];
            this.base = '';
            this.cleanStep2();

            let result = await this.load(mode);
            this.base = result.base;
            this.packs = result.packs;
        },

        loadPigments: async function () {
            const mode = 'pigments';

            this.cleanStep2();

            let result = await this.load(mode);

            this.photo = result.photo;
            this.pigments = result.pigments;

            this.pigments_price = parseFloat(result.pigments_price).toFixed(2);
            this.pigments_price_up = parseFloat(result.pigments_price_up).toFixed(2);
            this.pigments_price_amount = parseFloat((+this.pigments_price) + (+this.pigments_price_up)).toFixed(2);

            this.base_price = parseFloat(result.base_price).toFixed(2);
            this.base_amount = parseFloat(this.base_price).toFixed(2);

            this.amount = parseFloat((+this.base_amount) + (+this.pigments_price_amount)).toFixed(2);

        },

        load: async function (mode) {
            const link = this.$el.action;
            const data = new FormData();

            data.append('mode', mode);
            data.append('product', this.product);
            data.append('color', this.color);
            data.append('pack', this.pack);

            console.log(link + ' ' + mode);

            this.loading = true;
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.loading = false;

            return this.mock(mode);
        },

        cleanStep2: function () {
            this.photo = '';
            this.pigments = [];
            this.pigments_price = 0;
            this.pigments_price_up = 0;
            this.pigments_price_amount = 0;
            this.base_price = 0;
            this.base_discount = '0.0';
            this.base_amount = 0;
            this.amount = 0;
        },

        mock: function (mode) {
            switch (mode) {
                case 'products':
                    return [
                        {
                            id: 1,
                            name: 'name1',
                        },
                        {
                            id: 2,
                            name: 'name2',
                        },
                        {
                            id: 3,
                            name: 'name3',
                        },
                        {
                            id: 4,
                            name: 'name4',
                        },
                    ];
                case 'colors':
                    return [
                        {
                            id: 1,
                            name: 'color1',
                        },
                        {
                            id: 2,
                            name: 'color2',
                        },
                        {
                            id: 3,
                            name: 'color3',
                        },
                        {
                            id: 4,
                            name: 'color4',
                        },
                    ];
                case 'packs':
                    return {
                        packs: [
                            {
                                id: 1,
                                name: 'pack1',
                            },
                            {
                                id: 2,
                                name: 'pack2',
                            },
                            {
                                id: 3,
                                name: 'pack3',
                            },
                            {
                                id: 4,
                                name: 'pack4',
                            },
                        ],
                        base: 'base1'
                    };
                case 'pigments':
                    return {
                        pigments: [
                            {
                                name: 'name1',
                                quantity: 'quantity1',
                                price: 'price1',
                            },
                            {
                                name: 'name2',
                                quantity: 'quantity2',
                                price: 'price2',
                            },
                            {
                                name: 'name3',
                                quantity: 'quantity3',
                                price: 'price3',
                            },
                            {
                                name: 'name4',
                                quantity: 'quantity4',
                                price: 'price4',
                            },
                        ],

                        pigments_price : 100,
                        pigments_price_up : 20,
                        base_price : 300,

                        photo: './images/1.jpg'
                    };
            }
        }
    };
}