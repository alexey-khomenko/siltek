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

            this.load(mode).then(r => this.products = r);
        },

        loadColors: async function () {
            const mode = 'colors';

            this.color = 0;
            this.colors = [];
            this.pack = 0;
            this.packs = [];
            this.base = '';
            this.cleanStep2();

            this.load(mode).then(r => this.colors = r);
        },

        loadPacks: async function () {
            const mode = 'packs';

            this.pack = 0;
            this.packs = [];
            this.base = '';
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
                this.photo = r.photo;
                this.pigments = r.pigments;

                this.pigments_price = parseFloat(r.pigments_price).toFixed(2);
                this.pigments_price_up = parseFloat(r.pigments_price_up).toFixed(2);
                this.pigments_price_amount = parseFloat((+this.pigments_price) + (+this.pigments_price_up)).toFixed(2);

                this.base_price = parseFloat(r.base_price).toFixed(2);
                this.base_amount = parseFloat(this.base_price).toFixed(2);

                this.amount = parseFloat((+this.base_amount) + (+this.pigments_price_amount)).toFixed(2);
            });
        },

        load: async function (mode) {
            const link = this.$el.action;
            const data = new FormData();

            data.append('mode', mode);
            data.append('product', this.product);
            data.append('color', this.color);
            data.append('pack', this.pack);

            this.loading = true;
            const response = await fetch(link, {method: 'POST', body: data});
            await new Promise(resolve => setTimeout(resolve, 300));
            this.loading = false;

            return await response.json();
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
    };
}