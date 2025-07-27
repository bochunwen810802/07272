// 模拟数据
const deviceData = {
    aircon: { 
        name: '空调', 
        status: true, 
        power: 1200, 
        percentage: 45,
        weeklyData: [
            { day: '周一', value: 11.2 },
            { day: '周二', value: 12.5 },
            { day: '周三', value: 10.8 },
            { day: '周四', value: 13.1 },
            { day: '周五', value: 14.3 },
            { day: '周六', value: 15.2 },
            { day: '周日', value: 14.5 }
        ],
        monthlyData: [
            { day: '第1周', value: 75.6 },
            { day: '第2周', value: 82.3 },
            { day: '第3周', value: 78.7 },
            { day: '第4周', value: 85.1 }
        ]
    },
    light: { 
        name: '灯光', 
        status: false, 
        power: 150, 
        percentage: 5,
        weeklyData: [
            { day: '周一', value: 1.2 },
            { day: '周二', value: 1.5 },
            { day: '周三', value: 1.3 },
            { day: '周四', value: 1.1 },
            { day: '周五', value: 1.4 },
            { day: '周六', value: 1.6 },
            { day: '周日', value: 1.5 }
        ],
        monthlyData: [
            { day: '第1周', value: 8.6 },
            { day: '第2周', value: 9.3 },
            { day: '第3周', value: 8.7 },
            { day: '第4周', value: 9.1 }
        ]
    },
    tv: { 
        name: '电视', 
        status: true, 
        power: 400, 
        percentage: 15,
        weeklyData: [
            { day: '周一', value: 3.5 },
            { day: '周二', value: 4.2 },
            { day: '周三', value: 3.8 },
            { day: '周四', value: 4.1 },
            { day: '周五', value: 4.3 },
            { day: '周六', value: 5.2 },
            { day: '周日', value: 4.5 }
        ],
        monthlyData: [
            { day: '第1周', value: 25.6 },
            { day: '第2周', value: 28.3 },
            { day: '第3周', value: 26.7 },
            { day: '第4周', value: 29.1 }
        ]
    },
    fridge: { 
        name: '冰箱', 
        status: true, 
        power: 800, 
        percentage: 35,
        weeklyData: [
            { day: '周一', value: 7.5 },
            { day: '周二', value: 7.2 },
            { day: '周三', value: 7.8 },
            { day: '周四', value: 7.1 },
            { day: '周五', value: 7.3 },
            { day: '周六', value: 7.2 },
            { day: '周日', value: 7.5 }
        ],
        monthlyData: [
            { day: '第1周', value: 50.6 },
            { day: '第2周', value: 52.3 },
            { day: '第3周', value: 51.7 },
            { day: '第4周', value: 53.1 }
        ]
    }
};

// 当前选中的设备
let currentDevice = 'aircon';

// 模拟用电量数据 - 本周
const weeklyPowerData = [
    { day: '周一', value: 12.5 },
    { day: '周二', value: 14.2 },
    { day: '周三', value: 13.8 },
    { day: '周四', value: 15.1 },
    { day: '周五', value: 16.3 },
    { day: '周六', value: 18.2 },
    { day: '周日', value: 17.5 }
];

// 模拟用电量数据 - 本月
const monthlyPowerData = [
    { day: '第1周', value: 85.6 },
    { day: '第2周', value: 92.3 },
    { day: '第3周', value: 88.7 },
    { day: '第4周', value: 95.1 }
];

// 模拟一天中最高用电时段数据
const peakHoursData = [
    { hour: '00:00', value: 2.1 },
    { hour: '02:00', value: 1.8 },
    { hour: '04:00', value: 1.5 },
    { hour: '06:00', value: 2.3 },
    { hour: '08:00', value: 3.2 },
    { hour: '10:00', value: 3.8 },
    { hour: '12:00', value: 4.5 },
    { hour: '14:00', value: 4.2 },
    { hour: '16:00', value: 3.9 },
    { hour: '18:00', value: 5.8 }, // 最高峰值
    { hour: '20:00', value: 5.2 },
    { hour: '22:00', value: 3.1 }
];

// 模拟设备耗电量数据
const deviceConsumptionData = [
    { name: '空调', y: 45 },
    { name: '冰箱', y: 35 },
    { name: '电视', y: 15 },
    { name: '灯光', y: 5 }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化日期和时间
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // 初始化设备状态
    initDeviceStatus();
    
    // 初始化图表
    createPowerChart('weekly');
    createPeakHoursChart();
    createTopConsumerChart();
    
    // 添加事件监听器
    addEventListeners();
    
    // 初始化设备选择
    highlightSelectedDevice();
});

// 更新日期和时间
function updateDateTime() {
    const now = new Date();
    
    // 格式化日期：年-月-日
    const dateStr = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // 格式化时间：时:分:秒
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = timeStr;
}

// 初始化设备状态
function initDeviceStatus() {
    for (const [deviceId, deviceInfo] of Object.entries(deviceData)) {
        const deviceElement = document.querySelector(`.device[data-device="${deviceId}"]`);
        if (deviceElement) {
            const statusElement = deviceElement.querySelector('.status');
            
            if (statusElement) {
                statusElement.textContent = deviceInfo.status ? '开启' : '关闭';
                statusElement.className = `status ${deviceInfo.status ? 'on' : 'off'}`;
            }
        }
    }
}

// 高亮选中的设备
function highlightSelectedDevice() {
    // 移除所有设备的选中状态
    document.querySelectorAll('.device').forEach(device => {
        device.classList.remove('selected');
    });
    
    // 添加选中设备的高亮状态
    const selectedDevice = document.querySelector(`.device[data-device="${currentDevice}"]`);
    if (selectedDevice) {
        selectedDevice.classList.add('selected');
    }
}

// 添加事件监听器
function addEventListeners() {
    // 设备选择
    document.querySelectorAll('.radio-input input').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                currentDevice = this.value;
                highlightSelectedDevice();
                
                // 更新图表
                const currentPeriod = document.getElementById('weekly').classList.contains('active') ? 'weekly' : 'monthly';
                createPowerChart(currentPeriod);
            }
        });
    });
    
    // 设备点击选择
    document.querySelectorAll('.device').forEach(device => {
        device.addEventListener('click', function() {
            const deviceId = this.getAttribute('data-device');
            const radioInput = document.querySelector(`#${deviceId}-radio`);
            
            if (radioInput) {
                radioInput.checked = true;
                currentDevice = deviceId;
                highlightSelectedDevice();
                
                // 更新图表
                const currentPeriod = document.getElementById('weekly').classList.contains('active') ? 'weekly' : 'monthly';
                createPowerChart(currentPeriod);
            }
        });
    });
    
    // 用电量统计切换（本周/本月）
    document.getElementById('weekly').addEventListener('click', function() {
        document.getElementById('monthly').classList.remove('active');
        this.classList.add('active');
        createPowerChart('weekly');
    });
    
    document.getElementById('monthly').addEventListener('click', function() {
        document.getElementById('weekly').classList.remove('active');
        this.classList.add('active');
        createPowerChart('monthly');
    });
}

// 创建用电量统计图表
function createPowerChart(period) {
    const device = deviceData[currentDevice];
    const data = period === 'weekly' ? device.weeklyData : device.monthlyData;
    const categories = data.map(item => item.day);
    const values = data.map(item => item.value);
    
    // 图表配置
    const chartConfig = {
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            style: {
                fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif"
            }
        },
        title: {
            text: `${device.name}用电量统计`,
            style: {
                color: '#e4e6eb',
                fontSize: '16px'
            }
        },
        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#8a94a7'
                }
            },
            lineColor: '#2d3446',
            tickColor: '#2d3446'
        },
        yAxis: {
            title: {
                text: '用电量 (kWh)',
                style: {
                    color: '#8a94a7'
                }
            },
            labels: {
                style: {
                    color: '#8a94a7'
                }
            },
            gridLineColor: '#2d3446'
        },
        tooltip: {
            formatter: function() {
                return `<b>${this.x}</b><br>${this.y} kWh`;
            },
            backgroundColor: '#1a2035',
            borderColor: '#2d3446',
            style: {
                color: '#e4e6eb'
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.3,
                marker: {
                    enabled: true,
                    radius: 5,
                    symbol: 'circle'
                },
                lineWidth: 3
            }
        },
        series: [{
            name: '用电量',
            data: values,
            color: '#00c6ff',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, 'rgba(0, 198, 255, 0.5)'],
                    [1, 'rgba(0, 198, 255, 0.05)']
                ]
            },
            marker: {
                fillColor: '#00c6ff',
                lineColor: '#00c6ff',
                lineWidth: 2
            }
        }]
    };
    
    // 为月度图表添加更多配置
    if (period === 'monthly') {
        chartConfig.plotOptions.areaspline.pointStart = 1;
        chartConfig.plotOptions.areaspline.pointInterval = 1;
        chartConfig.xAxis.tickInterval = 1;
    }
    
    Highcharts.chart('power-chart', chartConfig);
}

// 创建一天中最高用电时段图表
function createPeakHoursChart() {
    const categories = peakHoursData.map(item => item.hour);
    const values = peakHoursData.map(item => item.value);
    
    Highcharts.chart('peak-hours-chart', {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            style: {
                fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif"
            }
        },
        title: {
            text: null
        },
        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#8a94a7'
                },
                step: 2
            },
            lineColor: '#2d3446',
            tickColor: '#2d3446'
        },
        yAxis: {
            title: {
                text: '用电量 (kWh)',
                style: {
                    color: '#8a94a7'
                }
            },
            labels: {
                style: {
                    color: '#8a94a7'
                }
            },
            gridLineColor: '#2d3446'
        },
        tooltip: {
            formatter: function() {
                return `<b>${this.x}</b><br>${this.y} kWh`;
            },
            backgroundColor: '#1a2035',
            borderColor: '#2d3446',
            style: {
                color: '#e4e6eb'
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                borderRadius: 3,
                colorByPoint: true,
                colors: values.map(value => {
                    // 找到最高值
                    const maxValue = Math.max(...values);
                    if (value === maxValue) {
                        return '#00c6ff'; // 最高值使用亮色
                    }
                    return 'rgba(0, 198, 255, 0.3)'; // 其他使用淡色
                })
            }
        },
        series: [{
            name: '用电量',
            data: values
        }]
    });
}

// 创建耗电量最高设备图表
function createTopConsumerChart() {
    Highcharts.chart('top-consumer-chart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            style: {
                fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif"
            }
        },
        title: {
            text: null
        },
        tooltip: {
            formatter: function() {
                return `<b>${this.point.name}</b><br>${this.y}% 的总用电量`;
            },
            backgroundColor: '#1a2035',
            borderColor: '#2d3446',
            style: {
                color: '#e4e6eb'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                innerSize: '60%',
                colors: ['#00c6ff', '#0088cc', '#005580', '#003366']
            }
        },
        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            itemStyle: {
                color: '#8a94a7'
            },
            itemHoverStyle: {
                color: '#e4e6eb'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '用电量',
            data: deviceConsumptionData
        }]
    });
    
    // 更新环形进度条
    updateProgressRing(deviceData.aircon.percentage);
}

// 更新环形进度条
function updateProgressRing(percentage) {
    const circle = document.getElementById('top-consumer-circle');
    const percentageText = document.querySelector('.percentage-text');
    
    if (circle && percentageText) {
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        
        // 计算偏移量
        const offset = circumference - (percentage / 100) * circumference;
        
        // 更新环形进度
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        
        // 更新文本
        percentageText.textContent = `${percentage}%`;
    }
} 