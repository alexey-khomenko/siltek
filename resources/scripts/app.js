import 'alpinejs';

window.calculatorData = function () {
    return {
        step2: false,
        loading: false,

        product: 0,
        products: [],

        part: 0,
        parts: [],
        photo: '',

        color: 0,
        colors: [],

        pack: 0,
        packs: [],
        base: '',

        pack_coefficient: 1,
        pigments: [],
        pigments_price_up: '0.00',
        base_price: '0.00',

        pigments_price: '0.00',
        pigments_price_amount: '0.00',
        base_discount: '0.0',
        base_amount: '0.00',
        amount: '0.00',

        calculate: {
            ["@input.debounce"]() {
                this.calculates();
            },
            ["@paste.debounce"]() {
                this.calculates();
            },
        },

        calculates: function () {
            this.pigments_price = 0;
            for (let i = 0, n = this.pigments.length; i < n; i++) {

                console.log(this.pigments[i]['price']);

                const sum = parseFloat(this.pigments[i]['quantity']) * parseFloat(this.pigments[i]['price']) * parseFloat(this.pack_coefficient) / 1000;

                this.pigments[i]['sum'] = sum.toFixed(2);
                this.pigments[i]['price'] = parseFloat(this.pigments[i]['price']).toFixed(2);

                this.pigments_price += sum;
            }
            this.pigments_price = (this.pigments_price).toFixed(2);

            this.pigments_price_amount = (parseFloat(this.pigments_price) + parseFloat(this.pigments_price_up)).toFixed(2);
            this.base_discount = parseFloat(this.base_discount).toFixed(1);
            this.base_amount = (parseFloat(this.base_price) - parseFloat(this.base_price) * parseFloat(this.base_discount) / 100).toFixed(2);
            this.amount = (parseFloat(this.base_amount) + parseFloat(this.pigments_price_amount)).toFixed(2);
        },

        loadProducts: async function () {
            const mode = 'products';

            this.cleanProducts();
            this.cleanParts();
            this.cleanColors();
            this.cleanPacks();
            this.cleanStep2();

            await this.load(mode).then(r => this.products = r);
        },

        loadParts: async function () {
            const mode = 'parts';

            this.cleanParts();
            this.cleanColors();
            this.cleanPacks();
            this.cleanStep2();

            this.load(mode).then(r => {
                this.parts = r.parts;
                this.photo = r.photo;
            });
        },

        loadColors: async function () {
            const mode = 'colors';

            this.cleanColors();
            this.cleanPacks();
            this.cleanStep2();

            this.load(mode).then(r => this.colors = r);
        },

        loadPacks: async function () {
            const mode = 'packs';

            this.cleanPacks();
            this.cleanStep2();

            this.load(mode).then(r => {
                this.base = r.base;
                this.packs = r.packs;
            });
        },

        loadPigments: async function () {
            const mode = 'pigments';

            this.cleanStep2();

            this.load(mode).then(r => {
                this.pack_coefficient = r.pack_coefficient;
                this.pigments = r.pigments;
                this.pigments_price_up = parseFloat(r.pigments_price_up).toFixed(2);
                this.base_price = parseFloat(r.base_price).toFixed(2);

                this.calculates();
                this.step2 = true;
            });
        },

        load: async function (mode) {
            const link = this.$el.action;
            const data = new FormData();

            data.append('mode', mode);
            data.append('product', this.product);
            data.append('part', this.part);
            data.append('color', this.color);
            data.append('pack', this.pack);

            console.log(link + ' ' + mode);

            this.loading = true;
            await new Promise(resolve => setTimeout(resolve, 500));
            this.loading = false;

            return this.mock(mode);
        },

        cleanProducts: function () {
            this.product = 0;
            this.products = [];
        },
        cleanParts: function () {
            this.part = 0;
            this.parts = [];
            this.photo = '';
        },
        cleanColors: function () {
            this.color = 0;
            this.colors = [];
        },
        cleanPacks: function () {
            this.pack = 0;
            this.packs = [];
            this.base = '';
        },
        cleanStep2: function () {
            this.step2 = false;

            this.pack_coefficient = 1;
            this.pigments = [];
            this.pigments_price = '0.00';
            this.pigments_price_up = '0.00';
            this.pigments_price_amount = '0.00';
            this.base_price = '0.00';
            this.base_discount = '0.0';
            this.base_amount = '0.00';
            this.amount = '0.00';
        },

        mock: function (mode) {
            switch (mode) {
                case 'products':
                    return [
                        {
                            id: 1,
                            name: 'product1',
                        },
                        {
                            id: 2,
                            name: 'product2',
                        },
                        {
                            id: 3,
                            name: 'product3',
                        },
                        {
                            id: 4,
                            name: 'product4',
                        },
                    ];
                case 'parts':
                    return {
                        'parts': [
                            {
                                id: 1,
                                name: 'part1',
                            },
                            {
                                id: 2,
                                name: 'part2',
                            },
                            {
                                id: 3,
                                name: 'part3',
                            },
                            {
                                id: 4,
                                name: 'part4',
                            },
                        ],

                        photo: './images/1.jpg'
                    };
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
                        pack_coefficient: 1.2,

                        pigments: [
                            {
                                name: 'name1',
                                quantity: 100,
                                price: 120.5,
                            },
                            {
                                name: 'name2',
                                quantity: 50,
                                price: 100,
                            },
                            {
                                name: 'name3',
                                quantity: 100,
                                price: 80,
                            },
                        ],

                        pigments_price_up: 20,
                        base_price: 300
                    };
            }
        }
    };
}