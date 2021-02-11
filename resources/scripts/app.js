import 'alpinejs';

window.calculatorData = function () {
    return {
        step2: false,
        loading: false,
        list: false,
        placeholder: '',

        product: 0,
        products: [],

        part: 0,
        parts: [],
        photo: '',

        color: 0,
        colors: [],
        colors_filtered: [],
        color_value: '',
        color_placeholder: '',

        pack: 0,
        packs: [],
        base: '',
        alert: '',

        pack_coefficient: 1,
        pigments: [],
        pigments_price_up: '0.00',
        base_price: '0.00',

        pigments_price: '0.00',
        pigments_price_amount: '0.00',
        base_discount: '0.0',
        base_amount: '0.00',
        amount: '0.00',

        calculatorInit: async function () {
            this.placeholder = this.$el.dataset.placeholder;
            this.color_placeholder = this.$el.dataset.placeholder;
            await this.loadProducts();
            this.$watch("color_value", value => this.colorsFilter(value));
        },

        colorsFilter: function (value) {
            this.cleanPacks();
            this.cleanStep2();
            this.colors_filtered = this.colors.filter((color) => ~color.name.indexOf(value.toUpperCase().trim()));
        },

        calculate: {
            ["@input.debounce.1000"]() {
                this.calculates();
            },
            ["@paste.debounce.1000"]() {
                this.calculates();
            },
        },

        calculatePigments: function () {
            let pigments_price = 0;

            for (let i = 0, n = this.pigments.length; i < n; i++) {
                let price, sum;

                price = isNaN(parseFloat(this.pigments[i]['price'])) ? 0 : parseFloat(this.pigments[i]['price']);
                price = price < 0 ? 0 : price;

                sum = parseFloat(this.pigments[i]['quantity']) * price * parseFloat(this.pack_coefficient) / 1000;
                pigments_price += sum;

                this.pigments[i]['sum'] = sum.toFixed(2);
                this.pigments[i]['price'] = price.toFixed(2);
            }

            this.pigments_price = pigments_price.toFixed(2);

            return pigments_price;
        },
        calculatePigmentsPriceUp: function () {
            let pigments_price_up;

            pigments_price_up = isNaN(parseFloat(this.pigments_price_up)) ? 0 : parseFloat(this.pigments_price_up);
            pigments_price_up = pigments_price_up < 0 ? 0 : pigments_price_up;

            this.pigments_price_up = pigments_price_up.toFixed(2);

            return pigments_price_up;
        },
        calculateBaseDiscount: function () {
            let base_discount;

            base_discount = isNaN(parseFloat(this.base_discount)) ? 0 : parseFloat(this.base_discount);
            base_discount = base_discount < 0 ? 0 : base_discount;
            base_discount = base_discount > 100 ? 100 : base_discount;

            this.base_discount = base_discount.toFixed(1);

            return base_discount;
        },
        calculatePigmentsPriceAmount: function (pigments_price, pigments_price_up) {
            let pigments_price_amount = pigments_price + pigments_price_up;

            this.pigments_price_amount = pigments_price_amount.toFixed(2);

            return pigments_price_amount;

        },
        calculateBaseAmount: function (base_price, base_discount) {
            let base_amount = base_price - base_price * base_discount / 100;

            this.base_amount = base_amount.toFixed(2);

            return base_amount;
        },
        calculates: function () {
            let pigments_price = this.calculatePigments();
            let pigments_price_up = this.calculatePigmentsPriceUp();
            let base_discount = this.calculateBaseDiscount();
            let pigments_price_amount = this.calculatePigmentsPriceAmount(pigments_price, pigments_price_up);
            let base_price = parseFloat(this.base_price);
            let base_amount = this.calculateBaseAmount(base_price, base_discount);

            this.amount = (base_amount + pigments_price_amount).toFixed(2);
        },

        loadProducts: async function () {
            const mode = 'products';

            this.cleanProducts();
            this.cleanParts();
            this.cleanColors();
            this.cleanPacks();
            this.cleanStep2();

            await this.load(mode).then(r => {
                this.products = r;
            });
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

            this.load(mode).then(r => {
                this.colors = r;
                this.colors_filtered = r;
            });
        },
        loadPacks: async function () {
            const mode = 'packs';

            this.cleanPacks();
            this.cleanStep2();

            this.load(mode).then(r => {
                this.base = r.base;
                this.packs = r.packs;
                this.alert = r.alert;
            });
        },
        loadPigments: async function () {
            const mode = 'pigments';

            this.cleanStep2();

            this.load(mode).then(r => {
                //this.pack_coefficient = parseFloat(r.pack_coefficient);
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
            this.color_value = '';
        },
        cleanPacks: function () {
            this.pack = 0;
            this.packs = [];
            this.base = '';
            this.alert = '';
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
                            name: 'COLOR11',
                        },
                        {
                            id: 2,
                            name: 'COLOR12',
                        },
                        {
                            id: 3,
                            name: 'COLOR3',
                        },
                        {
                            id: 4,
                            name: 'COLR4',
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

                        base: 'base1',
                        alert: 'Отримання точної передачі кольору можливо при тонуванні фарби в тарі не менше 4 л.',
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