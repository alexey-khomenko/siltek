function formData() {
    return {
        step: 1,
        calculated: false,

        product: 0,
        products: [],
        color: 0,
        colors: [],
        pack: 0,
        packs: [],
        base: 0,
        bases: [],
        photo: '',

        pigments: [],
        pigments_price: 0,
        pigments_price_up: 0,
        pigments_price_amount: 0,
        base_price: 0,
        base_discount: 0,
        base_amount: 0,
        amount: 0,

        loadProducts: function () {
            const mode = 'products';

            this.product = 0;
            this.products = [];
            this.color = 0;
            this.colors = [];
            this.pack = 0;
            this.packs = [];
            this.base = 0;
            this.bases = [];
            this.photo = '';
            this.pigments = [];

            setTimeout(() => {
                this.products = this.load(mode);
            }, 300);
        },

        loadColors: function () {
            const mode = 'colors';

            this.color = 0;
            this.colors = [];
            this.pack = 0;
            this.packs = [];
            this.base = 0;
            this.bases = [];
            this.photo = '';
            this.pigments = [];

            setTimeout(() => {
                this.colors = this.load(mode);
            }, 300);
        },

        loadPacks: function () {
            const mode = 'packs';

            this.pack = 0;
            this.packs = [];
            this.base = 0;
            this.bases = [];
            this.photo = '';
            this.pigments = [];

            setTimeout(() => {
                this.packs = this.load(mode);
            }, 300);
        },

        loadBases: function () {
            const mode = 'bases';

            this.base = 0;
            this.bases = [];
            this.photo = '';
            this.pigments = [];

            setTimeout(() => {
                this.bases = this.load(mode);
            }, 300);
        },

        loadPigments: function () {
            const mode = 'pigments';

            this.photo = '';
            this.pigments = [];
            this.pigments_price = 0;
            this.pigments_price_up = 0;
            this.pigments_price_amount = 0;
            this.base_price = 0;
            this.base_amount = 0;
            this.amount = 0;

            setTimeout(() => {
                let result = this.load(mode);

                this.photo = result.photo;
                this.pigments = result.pigments;
                this.pigments_price = result.pigments_price;
                this.pigments_price_up = result.pigments_price_up;
                this.pigments_price_amount = result.pigments_price_amount;
                this.base_price = result.base_price;
                this.base_amount = result.base_amount;
                this.amount = result.amount;
            }, 300);
        },

        load: function (mode) {
            const link = this.$el.action;
            const data = new FormData();

            data.append('mode', mode);
            data.append('product', this.product);
            data.append('color', this.color);
            data.append('pack', this.pack);
            data.append('base', this.base);
            data.append('base_discount', this.base_discount);

            console.log(link);
            console.log(mode);

            return this.mock(mode);
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
                    return [
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
                    ];
                case 'bases':
                    return [
                        {
                            id: 1,
                            name: 'base1',
                        },
                        {
                            id: 2,
                            name: 'base2',
                        },
                        {
                            id: 3,
                            name: 'base3',
                        },
                        {
                            id: 4,
                            name: 'base4',
                        },
                    ];
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
                        pigments_price_amount : 120,
                        base_price : 300,
                        base_amount : 300,
                        amount : 420,
                        photo: 'https://avatars3.githubusercontent.com/u/59030169?s=200&v=4'
                    };
            }
        }
    };
}