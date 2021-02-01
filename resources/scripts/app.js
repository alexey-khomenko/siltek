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
            ["@input.debounce"](){
                this.calculates();
            },
            ["@paste.debounce"](){
                this.calculates();
            },
        },

        calculates: function () {
            this.pigments_price = 0;
            for (let i = 0, n = this.pigments.length; i < n; i++) {
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

            this.load(mode).then(r => this.products = r);
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

            this.loading = true;
            const response = await fetch(link, {method: 'POST', body: data});
            this.loading = false;

            return await response.json();
        },

        cleanProducts: function () {
            this.product = 0;
            this.products = [];
            this.photo = '';
        },
        cleanParts: function () {
            this.part = 0;
            this.parts = [];
        },
        cleanColors: function () {
            this.color = 0;
            this.colors = [];
        },
        cleanPacks: function () {
            this.pack = 0;
            this.packs = [];
            this.pack_coefficient = 1;
            this.base = '';
        },
        cleanStep2: function () {
            this.step2 = false;

            this.pigments = [];
            this.pigments_price = '0.00';
            this.pigments_price_up = '0.00';
            this.pigments_price_amount = '0.00';
            this.base_price = '0.00';
            this.base_discount = '0.0';
            this.base_amount = '0.00';
            this.amount = '0.00';
        },
    };
}