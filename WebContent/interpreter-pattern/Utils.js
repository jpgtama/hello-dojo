function twoRandomDate() {

    var start = new Date(2014, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60),
            Math.floor(Math.random() * 60));

    var end = new Date(2015, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60),
            Math.floor(Math.random() * 60));

    return [
        start.toLocaleString(),
        start.getTime(),
        end.toLocaleString(),
        end.getTime()
    ];

}