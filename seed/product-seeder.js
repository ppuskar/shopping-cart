var Product = require('../models/product');

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/shopping');

var products = [new Product({
    imagepath: 'https://cdn11.bigcommerce.com/s-zgr9xks/images/stencil/1280x1280/products/418/882/duracell_batteries__74167__02229.1566415619.jpg?c=2',
    title: 'Duracell',
    description: '2 x 3V battery pack.',
    price: 20
}),
new Product({
    imagepath: 'https://images.homedepot-static.com/productImages/db677207-5610-4302-8212-68373b20a95a/svn/milwaukee-power-tool-batteries-48-11-2412-64_1000.jpg',
    title: 'Li-Ion battery',
    description: 'Improving run-time, power and speed; the M12 XC 3.0Ah High Capacity REDLITHIUM Battery 2-Pack will provide 2X the run-time and increased performance .',
    price: 60
}),
new Product({
    imagepath: 'https://assets.mitre10.co.nz/sys-master/productimages/h5b/h45/8898038300702/133006xlg.jpg',
    title: 'Max Max Battery D',
    description: 'Energizer Max batteries deliver dependable, powerful performance that keeps going and going, providing long life for the devices you use every day.',
    price: 45
}),
new Product({
    imagepath: 'https://eclats-antivols.fr/22833-large_default/2-battery-9v-lithium-battery-energizer-l522-750mah-em9v-very-high-capacity-batteries.jpg',
    title: '2 x Energizer',
    description: '2 BATTERY 9V LITHIUM BATTERY ENERGIZER L522 750MAH EM9V VERY HIGH CAPACITY BATTERIES.',
    price: 35
}),
new Product({
    imagepath: 'https://canadiantire.scene7.com/is/image/CanadianTire/0102498_1?defaultImage=image_na_EN&imageSet=CanadianTire/0102498_1?defaultImage=image_na_EN&id=3rmrp0&fmt=jpg&fit=constrain,1&wid=323&hei=323',
    title: 'MotoMaster Nautilus Ultra group',
    description: 'MotoMaster Nautilus Ultra Group 24 AGM Deep Cycle Battery premium AGM technology provides extra power and durability with no maintenance',
    price: 224
}),
new Product({
    imagepath: 'https://i1.adis.ws/i/washford/105605/Yuasa-U1R-Garden-Battery.webp?$sfcc_tile$&w=340',
    title: 'Yuasa U1 Specialist and Garden Battery',
    description: 'The Yuasa U1 Specialist and Garden Battery is designed for ride on mowers, kit cars, garden tractors and specialist applications.',
    price: 101
}),
new Product({
    imagepath: 'https://www.inventelectronics.com/wp-content/uploads/2015/01/9vHW1.png',
    title: 'Hi-Watt 9V battery',
    description: 'The Hi Watt 9V battery is an affordable, reliable, dedicated low-power solution to provide sufficient energy to your circuit. Ideally used in circuits with low power consumption so that it can work for longer durations.',
    price: 5
}),
new Product({
    imagepath: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/_/z/_zohd-lionpack-18650-lithium-ion-battery-14.8v-3.5ah-_4s1p-3500mah_5.jpg',
    title: 'ZOHD Lionpack 18650',
    description: '4S1P 3500mAh 14.8V Li-ion Battery  The Hi Watt 9V battery is an affordable, reliable, dedicated low-power solution to provide sufficient energy to your circuit. Ideally used in circuits with low power consumption so that it can work for longer durations.',
    price: 41
}),
];

var done = 0;
for (var i = 0; i < products.length; i++) {

    products[i].save(function (err, result) {
        done++;
        if (done == products.length) {
            exit();
        }
    });

}
function exit() {
    mongoose.disconnect();
}