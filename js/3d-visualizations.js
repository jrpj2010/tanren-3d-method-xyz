/**
 * AI超独学法：TANREN 3Dメソッド 統合LP
 * 3D可視化用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // 各種3D要素初期化
  const heroContainer = document.getElementById('hero-3d-cube');
  const methodContainer = document.getElementById('method-3d-cube');
  
  if (heroContainer && typeof THREE !== 'undefined') {
    setTimeout(() => initialize3DCube('hero-3d-cube'), 500);
  }
  
  if (methodContainer && typeof THREE !== 'undefined') {
    setTimeout(() => initialize3DCube('method-3d-cube'), 500);
  }
  
  // Chart.jsグラフ初期化（遅延実行）
  setTimeout(() => {
    if (typeof Chart !== 'undefined') {
      console.log('Chart.js is loaded, initializing axis charts');
      
      // X軸チャート
      const xAxisCanvas = document.getElementById('x-axis-chart');
      if (xAxisCanvas) {
        console.log('X-axis canvas found, creating diagram');
        createXAxisDiagram('x-axis-chart');
      } else {
        console.log('X-axis canvas not found');
      }
      
      // Y軸チャート
      const yAxisCanvas = document.getElementById('y-axis-chart');
      if (yAxisCanvas) {
        console.log('Y-axis canvas found, creating chart');
        createYAxisTimelineChart('y-axis-chart');
      } else {
        console.log('Y-axis canvas not found');
      }
      
      // Z軸チャート
      const zAxisCanvas = document.getElementById('z-axis-chart');
      if (zAxisCanvas) {
        console.log('Z-axis canvas found, creating chart');
        createZAxisLevelChart('z-axis-chart');
      } else {
        console.log('Z-axis canvas not found');
      }
    } else {
      console.log('Chart.js not loaded');
    }
  }, 1000); // 1秒後に実行
});

/**
 * X軸（思考の深掘り）を表すダイアグラム
 * @param {string} canvasId - チャートを描画するキャンバスのID
 */
function createXAxisDiagram(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '思考の深掘りサイクル',
        data: [
          { x: 0, y: 7 },   // 抽象
          { x: 5, y: 3 },   // 具体
          { x: 10, y: 7 },  // 再抽象化
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        showLine: true,
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 30,
          top: 20,
          bottom: 10
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: -1,
          max: 11,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            font: {
              size: 12
            },
            callback: function(value) {
              if(value === 0) return '抽象';
              if(value === 5) return '具体';
              if(value === 10) return '抽象';
              return value;
            }
          },
          title: {
            display: true,
            text: '思考プロセス',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {top: 10, bottom: 10}
          }
        },
        y: {
          min: 0,
          max: 10,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: '思考の深さ',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {top: 0, left: 10, right: 10, bottom: 0}
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.dataIndex;
              if (point === 0) return '抽象化（WHY?）';
              if (point === 1) return '具体化（HOW?）';
              if (point === 2) return '再抽象化（次のレベル）';
            }
          }
        }
      }
    }
  });
}

/**
 * Y軸（時間軸の視座）を表すタイムラインチャート
 * @param {string} canvasId - チャートを描画するキャンバスのID
 */
function createYAxisTimelineChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['過去', '', '現在', '', '未来'],
      datasets: [{
        label: '時間軸の視座',
        data: [2, 4, 6, 9, 12],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 30
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.dataIndex;
              if (point === 0) return '履歴力：過去の知識・経験';
              if (point === 2) return '観察力：現在の状況';
              if (point === 4) return '予測力・構想力：未来の可能性';
            }
          }
        },
        title: {
          display: true,
          text: '時間軸に沿った視点の広がり',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 30
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: 15
          },
          border: {
            width: 2
          }
        },
        y: {
          display: true,
          min: 0,
          max: 14,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            display: false
          },
          border: {
            width: 2
          },
          title: {
            display: true,
            text: '視野の広がり',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {
              top: 0,
              left: 10,
              right: 10,
              bottom: 0
            }
          }
        }
      }
    }
  });
}

/**
 * Z軸（レベル感の把握）を表す折れ線グラフ
 * @param {string} canvasId - チャートを描画するキャンバスのID
 */
function createZAxisLevelChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['初心者', '初級', '中級', '上級', 'マスター'],
      datasets: [{
        label: '現在地',
        data: [10, 7, 3, 1, 0],
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointRadius: 5
      }, {
        label: '目標',
        data: [10, 10, 8, 6, 3],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.0)',
        borderDash: [5, 5],
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'レベル感の把握',
          font: {
            size: 16,
            weight: 'bold'
          },
          color: '#8b5cf6',
          padding: {
            top: 5,
            bottom: 10
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const labels = {
                '初心者': '基礎的な知識がある',
                '初級': '基本的なスキルを習得',
                '中級': '応用力が備わる',
                '上級': '複雑な問題を解決できる',
                'マスター': '専門家レベルの熟達'
              };
              const level = context.label;
              const value = context.raw;
              return `${context.dataset.label}: 達成度 ${value}/10 (${labels[level]})`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold'
            },
            color: '#8b5cf6'
          }
        },
        y: {
          min: 0,
          max: 10,
          title: {
            display: true,
            text: '習熟度',
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#8b5cf6',
            padding: {top: 0, left: 5, right: 5, bottom: 0}
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 12
            },
            stepSize: 2
          }
        }
      }
    }
  });
}

/**
 * AI格差チャート（線グラフ）
 * @param {string} canvasId - チャートを描画するキャンバスのID 
 */
function createAIGapChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['現在', '半年後', '1年後', '2年後', '3年後'],
      datasets: [
        {
          label: 'AI活用者の成長',
          data: [10, 30, 65, 120, 200],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'AI非活用者の成長',
          data: [10, 12, 15, 18, 22],
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'AI活用の有無による生産性・成長の差',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.raw + '倍';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '生産性倍率（現在を10とした場合）'
          }
        }
      }
    }
  });
}