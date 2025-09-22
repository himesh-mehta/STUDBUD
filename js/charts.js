// Chart.js Configuration and Management
class ChartManager {
    constructor() {
        this.charts = {};
        this.initializeCharts();
    }
    
    initializeCharts() {
        // Set default Chart.js options
        Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
        Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
    }
    
    createWeeklyProgressChart() {
        const ctx = document.getElementById('weeklyProgressChart');
        if (!ctx) return;
        
        this.charts.weeklyProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: mockData.weeklyProgress.map(d => d.day),
                datasets: [{
                    label: 'Study Hours',
                    data: mockData.weeklyProgress.map(d => d.hours),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') + '20',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    createSubjectChart() {
        const ctx = document.getElementById('subjectChart');
        if (!ctx) return;
        
        this.charts.subject = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: mockData.subjectDistribution.map(d => d.subject),
                datasets: [{
                    data: mockData.subjectDistribution.map(d => d.hours),
                    backgroundColor: mockData.subjectDistribution.map(d => d.color),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    createDailyStudyChart() {
        const ctx = document.getElementById('dailyStudyChart');
        if (!ctx) return;
        
        this.charts.dailyStudy = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mockData.dailyStudyTime.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'Study Hours',
                    data: mockData.dailyStudyTime.map(d => d.time),
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') + '80',
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    createChapterProgressChart() {
        const ctx = document.getElementById('chapterProgressChart');
        if (!ctx) return;
        
        this.charts.chapterProgress = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mockData.chapterProgress.map(d => d.subject),
                datasets: [
                    {
                        label: 'Completed',
                        data: mockData.chapterProgress.map(d => d.completed),
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                        borderRadius: 4
                    },
                    {
                        label: 'Remaining',
                        data: mockData.chapterProgress.map(d => d.total - d.completed),
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
    
    createConceptMasteryChart() {
        const ctx = document.getElementById('conceptMasteryChart');
        if (!ctx) return;
        
        this.charts.conceptMastery = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: mockData.conceptMastery.map(d => d.level),
                datasets: [{
                    data: mockData.conceptMastery.map(d => d.count),
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    createLearningVelocityChart() {
        const ctx = document.getElementById('learningVelocityChart');
        if (!ctx) return;
        
        this.charts.learningVelocity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: mockData.learningVelocity.map(d => d.week),
                datasets: [{
                    label: 'Concepts Learned',
                    data: mockData.learningVelocity.map(d => d.concepts),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') + '20',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    updateChartsForTheme() {
        // Update all charts when theme changes
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.options.scales.y.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
                chart.update();
            }
        });
    }
    
    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }
    
    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartName => {
            this.destroyChart(chartName);
        });
    }
}

// Initialize chart manager
const chartManager = new ChartManager();