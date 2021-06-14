function displayMember(name) {
    var m = members.find(e => e.name == name);
    document.getElementById("tableTitle").innerHTML = `${name}<br>${m.kills}-${m.deaths}<br>${m.kd}`;
    var d = {};
    var allKDs = []
    var nws = [];

    for (let i = 0; i < nodewarNames.length; i++) {
            nws.push(nodewarNames[i]);
    }

    for (let i = 0; i < nws.length; i++) {

        if (m.stats[i] != null) {
            if (m.stats[i][1] > 0) {
                kd = parseFloat(m.stats[i][0] / m.stats[i][1]).toFixed(2);
            } else {
                kd = m.stats[i][0];
            }
            allKDs.push(kd);
            date = nws[i].split("w")[1];
            day = date.slice(0, 2);
            month = date.slice(2, 4);
            d[day + "." + month] = `${m.stats[i][0]} | ${m.stats[i][1]} (${kd})`;
        }
    }
    var table = new gridjs.Grid({
        columns: Object.keys(d),
        data: [d],
        pagination: false,
        style:{
        
            td:{
            "backgroundColor":"#111",
            "borderColor":"#222831"
        },
        container :{
            "color":"#ececec",
            "borderColor":"#222831"
        },
        table:{
            "backgroundColor":"#111",
            "color":"#ececec",
            "borderColor":"#222831"
        },
        th:{
            "backgroundColor":"#f2a365",
            "color":"#111",
            "borderColor":"#222831"
        },
        pargination:{
            "backgroundColor":"#111",
            "borderColor":"#222831"
        }
    
    
        }

    }).render(document.getElementById("wrapper"));

    avgKDs = [];
    nodewars.forEach(nw => {
        joinedNws = Object.keys(d)
        date = nw.date
        if (joinedNws.includes(date)) {
            avgKDs.push(nw.kd);
        }
    });
    const data = {
        labels: Object.keys(d),
        datasets: [{
            label: m.name,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: allKDs
        }, {
            label: "Avg",
            backgroundColor: 'rgb(123, 99, 255)',
            borderColor: 'rgb(123, 99, 255)',
            data: avgKDs
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    kdChart = new Chart(
        document.getElementById('kdChart'),
        config
    );

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');

displayMember(name);








