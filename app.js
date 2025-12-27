// ===== SVG Data Visualizer =====
// Interactive data visualization tool with pure JavaScript

class SVGVisualizer {
    constructor() {
        this.data = null;
        this.chartType = 'bar';
        this.palette = 'vibrant';
        this.animation = 'none';
        this.settings = {
            width: 800,
            height: 500,
            padding: { top: 60, right: 40, bottom: 60, left: 60 },
            showGrid: true,
            showLegend: true,
            showValues: false,
            title: '',
            bgColor: '#1a1a2e',
            textColor: '#ffffff',
            fontFamily: 'Outfit',
            borderRadius: 4,
            showShadow: false,
            transparentBg: false,
            animationDuration: 800,
            animationDelay: 0,
            easing: 'ease',
            enableHover: true,
            enableTooltip: true,
            enableClick: false,
            xField: null,
            yField: null,
            sizeField: null
        };

        this.palettes = {
            vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
            ocean: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8', '#03045E', '#023E8A', '#0096C7'],
            sunset: ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
            forest: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC'],
            neon: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0080', '#80FF00', '#00FF80', '#8000FF'],
            pastel: ['#FFB5BA', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F0E6EF', '#E8D5B7']
        };

        this.sampleData = {
            sales: {
                data: [
                    { month: '1월', sales: 4200, target: 4000 },
                    { month: '2월', sales: 3800, target: 4200 },
                    { month: '3월', sales: 5100, target: 4500 },
                    { month: '4월', sales: 4600, target: 4800 },
                    { month: '5월', sales: 5800, target: 5000 },
                    { month: '6월', sales: 6200, target: 5500 },
                    { month: '7월', sales: 5900, target: 6000 },
                    { month: '8월', sales: 6800, target: 6200 },
                    { month: '9월', sales: 7200, target: 6500 },
                    { month: '10월', sales: 6500, target: 6800 },
                    { month: '11월', sales: 7800, target: 7000 },
                    { month: '12월', sales: 8500, target: 7500 }
                ],
                xField: 'month',
                yField: 'sales',
                title: '2024년 월별 매출 현황'
            },
            population: {
                data: [
                    { country: '중국', population: 1412, growth: 0.1 },
                    { country: '인도', population: 1408, growth: 0.8 },
                    { country: '미국', population: 333, growth: 0.4 },
                    { country: '인도네시아', population: 277, growth: 0.9 },
                    { country: '브라질', population: 215, growth: 0.5 },
                    { country: '파키스탄', population: 231, growth: 1.9 },
                    { country: '나이지리아', population: 223, growth: 2.4 },
                    { country: '방글라데시', population: 171, growth: 1.0 }
                ],
                xField: 'country',
                yField: 'population',
                title: '세계 인구 상위 국가 (백만명)'
            },
            temperature: {
                data: [
                    { month: '1월', seoul: -2.4, tokyo: 5.2, newyork: 0.3 },
                    { month: '2월', seoul: 0.4, tokyo: 5.7, newyork: 1.8 },
                    { month: '3월', seoul: 5.7, tokyo: 8.9, newyork: 6.5 },
                    { month: '4월', seoul: 12.5, tokyo: 14.1, newyork: 12.4 },
                    { month: '5월', seoul: 17.8, tokyo: 18.2, newyork: 17.6 },
                    { month: '6월', seoul: 22.2, tokyo: 21.4, newyork: 22.8 },
                    { month: '7월', seoul: 24.9, tokyo: 25.0, newyork: 26.2 },
                    { month: '8월', seoul: 25.7, tokyo: 26.4, newyork: 25.3 },
                    { month: '9월', seoul: 21.2, tokyo: 22.8, newyork: 21.1 },
                    { month: '10월', seoul: 14.8, tokyo: 17.5, newyork: 14.8 },
                    { month: '11월', seoul: 7.2, tokyo: 12.1, newyork: 9.2 },
                    { month: '12월', seoul: 0.4, tokyo: 7.6, newyork: 3.8 }
                ],
                xField: 'month',
                yField: 'seoul',
                title: '월별 평균 기온 (°C)'
            },
            categories: {
                data: [
                    { category: '전자제품', value: 35, color: '#FF6B6B' },
                    { category: '의류', value: 25, color: '#4ECDC4' },
                    { category: '식품', value: 20, color: '#45B7D1' },
                    { category: '가구', value: 12, color: '#96CEB4' },
                    { category: '기타', value: 8, color: '#FFEAA7' }
                ],
                xField: 'category',
                yField: 'value',
                title: '카테고리별 매출 비율 (%)'
            },
            scatter: {
                data: [
                    { age: 25, income: 35000, satisfaction: 7.2 },
                    { age: 30, income: 48000, satisfaction: 7.8 },
                    { age: 35, income: 62000, satisfaction: 8.1 },
                    { age: 40, income: 75000, satisfaction: 7.5 },
                    { age: 45, income: 85000, satisfaction: 7.9 },
                    { age: 28, income: 42000, satisfaction: 6.8 },
                    { age: 32, income: 55000, satisfaction: 8.2 },
                    { age: 38, income: 68000, satisfaction: 7.0 },
                    { age: 42, income: 78000, satisfaction: 8.5 },
                    { age: 50, income: 92000, satisfaction: 7.3 },
                    { age: 27, income: 38000, satisfaction: 7.6 },
                    { age: 33, income: 51000, satisfaction: 6.9 },
                    { age: 48, income: 88000, satisfaction: 8.0 },
                    { age: 55, income: 98000, satisfaction: 7.7 },
                    { age: 29, income: 45000, satisfaction: 8.3 }
                ],
                xField: 'age',
                yField: 'income',
                sizeField: 'satisfaction',
                title: '나이별 소득 분포'
            },
            stocks: {
                data: [
                    { date: '1/1', apple: 180, google: 140, amazon: 150 },
                    { date: '2/1', apple: 185, google: 145, amazon: 155 },
                    { date: '3/1', apple: 178, google: 142, amazon: 148 },
                    { date: '4/1', apple: 192, google: 155, amazon: 162 },
                    { date: '5/1', apple: 188, google: 150, amazon: 158 },
                    { date: '6/1', apple: 195, google: 160, amazon: 170 },
                    { date: '7/1', apple: 205, google: 168, amazon: 178 },
                    { date: '8/1', apple: 198, google: 162, amazon: 172 },
                    { date: '9/1', apple: 210, google: 175, amazon: 185 },
                    { date: '10/1', apple: 220, google: 180, amazon: 190 },
                    { date: '11/1', apple: 215, google: 185, amazon: 195 },
                    { date: '12/1', apple: 230, google: 192, amazon: 205 }
                ],
                xField: 'date',
                yField: 'apple',
                title: '2024년 주가 추이'
            },
            radar: {
                data: [
                    { skill: '공격력', player1: 85, player2: 70 },
                    { skill: '수비력', player1: 70, player2: 88 },
                    { skill: '속도', player1: 90, player2: 75 },
                    { skill: '체력', player1: 78, player2: 82 },
                    { skill: '기술', player1: 88, player2: 80 },
                    { skill: '정신력', player1: 75, player2: 85 }
                ],
                xField: 'skill',
                yField: 'player1',
                title: '선수 능력치 비교'
            },
            treemap: {
                data: [
                    { name: 'IT서비스', value: 450, parent: 'root' },
                    { name: '금융', value: 380, parent: 'root' },
                    { name: '제조', value: 320, parent: 'root' },
                    { name: '유통', value: 280, parent: 'root' },
                    { name: '건설', value: 220, parent: 'root' },
                    { name: '에너지', value: 180, parent: 'root' },
                    { name: '헬스케어', value: 150, parent: 'root' },
                    { name: '미디어', value: 120, parent: 'root' }
                ],
                xField: 'name',
                yField: 'value',
                title: '산업별 시장 규모'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFieldSelects();
        this.initSplashModal();
    }

    initSplashModal() {
        const logoIcon = document.getElementById('logoIcon');
        const splashModal = document.getElementById('splashModal');
        const closeSplash = document.getElementById('closeSplash');

        if (logoIcon && splashModal) {
            logoIcon.addEventListener('click', () => {
                splashModal.classList.add('active');
                document.body.classList.add('modal-open');
            });

            if (closeSplash) {
                closeSplash.addEventListener('click', () => {
                    splashModal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                });
            }

            splashModal.addEventListener('click', (e) => {
                if (e.target === splashModal) {
                    splashModal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        }
    }

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // File upload
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) this.handleFile(file);
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.handleFile(file);
        });

        // Sample data
        document.querySelectorAll('.sample-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.loadSampleData(e.currentTarget.dataset.sample);
            });
        });

        // Chart type
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.chartType = e.currentTarget.dataset.chart;
                this.updateSizeFieldVisibility();
                this.renderChart();
            });
        });

        // Palette
        document.querySelectorAll('.palette-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.palette = e.currentTarget.dataset.palette;
                this.renderChart();
            });
        });

        // Animation type
        document.querySelectorAll('.animation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.animation-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.animation = e.currentTarget.dataset.animation;
                this.renderChart();
            });
        });

        // Form inputs
        const inputs = [
            'chartTitle', 'chartWidth', 'chartHeight', 'showGrid', 'showLegend',
            'showValues', 'bgColor', 'textColor', 'fontFamily', 'borderRadius',
            'showShadow', 'transparentBg', 'animationDuration', 'animationDelay',
            'easingFunction', 'enableHover', 'enableTooltip', 'enableClick',
            'xField', 'yField', 'sizeField'
        ];

        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const eventType = el.type === 'checkbox' ? 'change' : 'input';
                el.addEventListener(eventType, () => this.updateSettings());
            }
        });

        // Color sync
        document.getElementById('bgColor').addEventListener('input', (e) => {
            document.getElementById('bgColorText').value = e.target.value;
        });
        document.getElementById('bgColorText').addEventListener('input', (e) => {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                document.getElementById('bgColor').value = e.target.value;
            }
        });
        document.getElementById('textColor').addEventListener('input', (e) => {
            document.getElementById('textColorText').value = e.target.value;
        });
        document.getElementById('textColorText').addEventListener('input', (e) => {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                document.getElementById('textColor').value = e.target.value;
            }
        });

        // Range value display
        document.getElementById('borderRadius').addEventListener('input', (e) => {
            document.getElementById('radiusValue').textContent = e.target.value;
        });
        document.getElementById('animationDuration').addEventListener('input', (e) => {
            document.getElementById('durationValue').textContent = e.target.value;
        });
        document.getElementById('animationDelay').addEventListener('input', (e) => {
            document.getElementById('delayValue').textContent = e.target.value;
        });

        // Actions
        document.getElementById('downloadSVG').addEventListener('click', () => this.downloadSVG());
        document.getElementById('replayAnimation').addEventListener('click', () => this.renderChart());
        document.getElementById('toggleTheme').addEventListener('click', () => this.toggleTheme());
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelector(`.nav-tab[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    }

    handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            try {
                if (file.name.endsWith('.json')) {
                    this.data = JSON.parse(content);
                } else if (file.name.endsWith('.csv')) {
                    this.data = this.parseCSV(content);
                }
                this.updateFieldSelects();
                this.autoSelectFields();
                this.updateDataPreview();
                this.renderChart();
            } catch (error) {
                alert('파일 파싱 오류: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    parseCSV(content) {
        const lines = content.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const row = {};
            headers.forEach((header, index) => {
                const value = values[index];
                row[header] = isNaN(value) ? value : parseFloat(value);
            });
            data.push(row);
        }

        return data;
    }

    loadSampleData(sampleName) {
        const sample = this.sampleData[sampleName];
        if (sample) {
            this.data = sample.data;
            this.settings.title = sample.title;
            this.settings.xField = sample.xField;
            this.settings.yField = sample.yField;
            if (sample.sizeField) {
                this.settings.sizeField = sample.sizeField;
            }

            document.getElementById('chartTitle').value = sample.title;
            this.updateFieldSelects();
            document.getElementById('xField').value = sample.xField;
            document.getElementById('yField').value = sample.yField;
            if (sample.sizeField) {
                document.getElementById('sizeField').value = sample.sizeField;
            }

            this.updateDataPreview();
            this.renderChart();
        }
    }

    updateFieldSelects() {
        const xSelect = document.getElementById('xField');
        const ySelect = document.getElementById('yField');
        const sizeSelect = document.getElementById('sizeField');

        [xSelect, ySelect, sizeSelect].forEach(select => {
            select.innerHTML = '<option value="">필드 선택</option>';
        });

        if (this.data && this.data.length > 0) {
            const fields = Object.keys(this.data[0]);
            fields.forEach(field => {
                [xSelect, ySelect, sizeSelect].forEach(select => {
                    const option = document.createElement('option');
                    option.value = field;
                    option.textContent = field;
                    select.appendChild(option);
                });
            });
        }
    }

    autoSelectFields() {
        if (this.data && this.data.length > 0) {
            const fields = Object.keys(this.data[0]);
            const numericFields = fields.filter(f => typeof this.data[0][f] === 'number');
            const stringFields = fields.filter(f => typeof this.data[0][f] === 'string');

            if (stringFields.length > 0) {
                this.settings.xField = stringFields[0];
                document.getElementById('xField').value = stringFields[0];
            }
            if (numericFields.length > 0) {
                this.settings.yField = numericFields[0];
                document.getElementById('yField').value = numericFields[0];
            }
        }
    }

    updateDataPreview() {
        const preview = document.getElementById('dataPreview');
        if (!this.data || this.data.length === 0) {
            preview.innerHTML = '<p class="placeholder-text">데이터를 업로드하거나 샘플을 선택하세요</p>';
            return;
        }

        const headers = Object.keys(this.data[0]);
        const rows = this.data.slice(0, 5);

        let html = '<table class="data-table"><thead><tr>';
        headers.forEach(h => html += `<th>${h}</th>`);
        html += '</tr></thead><tbody>';

        rows.forEach(row => {
            html += '<tr>';
            headers.forEach(h => html += `<td>${row[h]}</td>`);
            html += '</tr>';
        });

        if (this.data.length > 5) {
            html += `<tr><td colspan="${headers.length}" style="text-align:center;color:var(--text-muted)">... 외 ${this.data.length - 5}개 행</td></tr>`;
        }

        html += '</tbody></table>';
        preview.innerHTML = html;
    }

    updateSizeFieldVisibility() {
        const group = document.getElementById('sizeFieldGroup');
        group.style.display = this.chartType === 'scatter' ? 'block' : 'none';
    }

    updateSettings() {
        this.settings.title = document.getElementById('chartTitle').value;
        this.settings.width = parseInt(document.getElementById('chartWidth').value) || 800;
        this.settings.height = parseInt(document.getElementById('chartHeight').value) || 500;
        this.settings.showGrid = document.getElementById('showGrid').checked;
        this.settings.showLegend = document.getElementById('showLegend').checked;
        this.settings.showValues = document.getElementById('showValues').checked;
        this.settings.bgColor = document.getElementById('bgColor').value;
        this.settings.textColor = document.getElementById('textColor').value;
        this.settings.fontFamily = document.getElementById('fontFamily').value;
        this.settings.borderRadius = parseInt(document.getElementById('borderRadius').value);
        this.settings.showShadow = document.getElementById('showShadow').checked;
        this.settings.transparentBg = document.getElementById('transparentBg').checked;
        this.settings.animationDuration = parseInt(document.getElementById('animationDuration').value);
        this.settings.animationDelay = parseInt(document.getElementById('animationDelay').value);
        this.settings.easing = document.getElementById('easingFunction').value;
        this.settings.enableHover = document.getElementById('enableHover').checked;
        this.settings.enableTooltip = document.getElementById('enableTooltip').checked;
        this.settings.enableClick = document.getElementById('enableClick').checked;
        this.settings.xField = document.getElementById('xField').value;
        this.settings.yField = document.getElementById('yField').value;
        this.settings.sizeField = document.getElementById('sizeField').value;

        this.renderChart();
    }

    renderChart() {
        if (!this.data || !this.settings.xField || !this.settings.yField) {
            return;
        }

        const container = document.getElementById('chartContainer');
        container.innerHTML = '';

        const svg = this.createSVG();
        container.appendChild(svg);

        this.applyAnimation(svg);
        this.bindInteractions(svg);
    }

    createSVG() {
        const { width, height, padding } = this.settings;
        const colors = this.palettes[this.palette];

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.classList.add('chart-svg');

        // Defs for gradients and filters
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Shadow filter
        if (this.settings.showShadow) {
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', 'shadow');
            filter.innerHTML = `
                <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/>
            `;
            defs.appendChild(filter);
        }

        // Gradients for each color
        colors.forEach((color, i) => {
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `gradient-${i}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '0%');
            gradient.setAttribute('y2', '100%');
            gradient.innerHTML = `
                <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
                <stop offset="100%" stop-color="${color}" stop-opacity="0.7"/>
            `;
            defs.appendChild(gradient);
        });

        svg.appendChild(defs);

        // Background
        if (!this.settings.transparentBg) {
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bg.setAttribute('width', width);
            bg.setAttribute('height', height);
            bg.setAttribute('fill', this.settings.bgColor);
            bg.setAttribute('rx', '16');
            svg.appendChild(bg);
        }

        // Title
        if (this.settings.title) {
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            title.setAttribute('x', width / 2);
            title.setAttribute('y', 35);
            title.setAttribute('text-anchor', 'middle');
            title.setAttribute('fill', this.settings.textColor);
            title.setAttribute('font-family', this.settings.fontFamily);
            title.setAttribute('font-size', '18');
            title.setAttribute('font-weight', '600');
            title.textContent = this.settings.title;
            svg.appendChild(title);
        }

        // Render chart based on type
        switch (this.chartType) {
            case 'bar':
                this.renderBarChart(svg);
                break;
            case 'horizontal':
                this.renderHorizontalBarChart(svg);
                break;
            case 'line':
                this.renderLineChart(svg);
                break;
            case 'area':
                this.renderAreaChart(svg);
                break;
            case 'pie':
                this.renderPieChart(svg);
                break;
            case 'donut':
                this.renderDonutChart(svg);
                break;
            case 'scatter':
                this.renderScatterChart(svg);
                break;
            case 'radar':
                this.renderRadarChart(svg);
                break;
        }

        return svg;
    }

    renderBarChart(svg) {
        const { width, height, padding, xField, yField, textColor, fontFamily, showGrid, showValues, borderRadius, showShadow } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const maxValue = Math.max(...data.map(d => d[yField]));
        const barWidth = chartWidth / data.length * 0.7;
        const gap = chartWidth / data.length * 0.3;

        // Grid
        if (showGrid) {
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding.top + (chartHeight / gridLines) * i;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', padding.left);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding.right);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', textColor);
                line.setAttribute('stroke-opacity', '0.1');
                line.setAttribute('stroke-dasharray', '4');
                svg.appendChild(line);

                // Y-axis labels
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', padding.left - 10);
                label.setAttribute('y', y + 4);
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('fill', textColor);
                label.setAttribute('fill-opacity', '0.6');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '11');
                const value = Math.round(maxValue - (maxValue / gridLines) * i);
                label.textContent = this.formatNumber(value);
                svg.appendChild(label);
            }
        }

        // Bars
        data.forEach((d, i) => {
            const barHeight = (d[yField] / maxValue) * chartHeight;
            const x = padding.left + (chartWidth / data.length) * i + gap / 2;
            const y = padding.top + chartHeight - barHeight;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', barHeight);
            rect.setAttribute('fill', `url(#gradient-${i % colors.length})`);
            rect.setAttribute('rx', borderRadius);
            rect.classList.add('chart-element');
            rect.dataset.label = d[xField];
            rect.dataset.value = d[yField];

            if (showShadow) {
                rect.setAttribute('filter', 'url(#shadow)');
            }

            svg.appendChild(rect);

            // X-axis labels
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + barWidth / 2);
            label.setAttribute('y', height - padding.bottom + 20);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', textColor);
            label.setAttribute('fill-opacity', '0.6');
            label.setAttribute('font-family', fontFamily);
            label.setAttribute('font-size', '11');
            label.textContent = d[xField];
            svg.appendChild(label);

            // Value labels
            if (showValues) {
                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', x + barWidth / 2);
                valueLabel.setAttribute('y', y - 8);
                valueLabel.setAttribute('text-anchor', 'middle');
                valueLabel.setAttribute('fill', textColor);
                valueLabel.setAttribute('font-family', fontFamily);
                valueLabel.setAttribute('font-size', '11');
                valueLabel.setAttribute('font-weight', '500');
                valueLabel.textContent = this.formatNumber(d[yField]);
                svg.appendChild(valueLabel);
            }
        });

        // Axes
        this.drawAxes(svg);
    }

    renderHorizontalBarChart(svg) {
        const { width, height, padding, xField, yField, textColor, fontFamily, showGrid, showValues, borderRadius, showShadow } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const chartWidth = width - padding.left - padding.right - 60;
        const chartHeight = height - padding.top - padding.bottom;

        const maxValue = Math.max(...data.map(d => d[yField]));
        const barHeight = chartHeight / data.length * 0.7;
        const gap = chartHeight / data.length * 0.3;

        // Grid
        if (showGrid) {
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const x = padding.left + 60 + (chartWidth / gridLines) * i;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', padding.top);
                line.setAttribute('x2', x);
                line.setAttribute('y2', height - padding.bottom);
                line.setAttribute('stroke', textColor);
                line.setAttribute('stroke-opacity', '0.1');
                line.setAttribute('stroke-dasharray', '4');
                svg.appendChild(line);
            }
        }

        // Bars
        data.forEach((d, i) => {
            const barWidth = (d[yField] / maxValue) * chartWidth;
            const x = padding.left + 60;
            const y = padding.top + (chartHeight / data.length) * i + gap / 2;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', barHeight);
            rect.setAttribute('fill', `url(#gradient-${i % colors.length})`);
            rect.setAttribute('rx', borderRadius);
            rect.classList.add('chart-element');
            rect.dataset.label = d[xField];
            rect.dataset.value = d[yField];

            if (showShadow) {
                rect.setAttribute('filter', 'url(#shadow)');
            }

            svg.appendChild(rect);

            // Y-axis labels
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', padding.left + 55);
            label.setAttribute('y', y + barHeight / 2 + 4);
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('fill', textColor);
            label.setAttribute('fill-opacity', '0.8');
            label.setAttribute('font-family', fontFamily);
            label.setAttribute('font-size', '11');
            label.textContent = d[xField];
            svg.appendChild(label);

            // Value labels
            if (showValues) {
                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', x + barWidth + 8);
                valueLabel.setAttribute('y', y + barHeight / 2 + 4);
                valueLabel.setAttribute('text-anchor', 'start');
                valueLabel.setAttribute('fill', textColor);
                valueLabel.setAttribute('font-family', fontFamily);
                valueLabel.setAttribute('font-size', '11');
                valueLabel.setAttribute('font-weight', '500');
                valueLabel.textContent = this.formatNumber(d[yField]);
                svg.appendChild(valueLabel);
            }
        });
    }

    renderLineChart(svg) {
        const { width, height, padding, xField, yField, textColor, fontFamily, showGrid, showValues } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const maxValue = Math.max(...data.map(d => d[yField]));
        const minValue = Math.min(...data.map(d => d[yField]));
        const range = maxValue - minValue;

        // Grid
        if (showGrid) {
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding.top + (chartHeight / gridLines) * i;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', padding.left);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding.right);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', textColor);
                line.setAttribute('stroke-opacity', '0.1');
                line.setAttribute('stroke-dasharray', '4');
                svg.appendChild(line);

                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', padding.left - 10);
                label.setAttribute('y', y + 4);
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('fill', textColor);
                label.setAttribute('fill-opacity', '0.6');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '11');
                const value = Math.round(maxValue - (range / gridLines) * i);
                label.textContent = this.formatNumber(value);
                svg.appendChild(label);
            }
        }

        // Line path
        const points = data.map((d, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight - ((d[yField] - minValue) / range) * chartHeight;
            return { x, y, d };
        });

        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', colors[0]);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.classList.add('chart-line');
        svg.appendChild(path);

        // Points
        points.forEach((p, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', colors[0]);
            circle.setAttribute('stroke', this.settings.bgColor);
            circle.setAttribute('stroke-width', '2');
            circle.classList.add('chart-element');
            circle.dataset.label = p.d[xField];
            circle.dataset.value = p.d[yField];
            svg.appendChild(circle);

            // X-axis labels
            if (i % Math.ceil(data.length / 10) === 0 || data.length <= 12) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', p.x);
                label.setAttribute('y', height - padding.bottom + 20);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', textColor);
                label.setAttribute('fill-opacity', '0.6');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '11');
                label.textContent = p.d[xField];
                svg.appendChild(label);
            }

            // Value labels
            if (showValues) {
                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', p.x);
                valueLabel.setAttribute('y', p.y - 12);
                valueLabel.setAttribute('text-anchor', 'middle');
                valueLabel.setAttribute('fill', textColor);
                valueLabel.setAttribute('font-family', fontFamily);
                valueLabel.setAttribute('font-size', '10');
                valueLabel.textContent = this.formatNumber(p.d[yField]);
                svg.appendChild(valueLabel);
            }
        });

        this.drawAxes(svg);
    }

    renderAreaChart(svg) {
        const { width, height, padding, xField, yField, textColor, fontFamily, showGrid, showValues } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const maxValue = Math.max(...data.map(d => d[yField]));
        const minValue = 0;
        const range = maxValue - minValue;

        // Grid
        if (showGrid) {
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding.top + (chartHeight / gridLines) * i;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', padding.left);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding.right);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', textColor);
                line.setAttribute('stroke-opacity', '0.1');
                line.setAttribute('stroke-dasharray', '4');
                svg.appendChild(line);

                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', padding.left - 10);
                label.setAttribute('y', y + 4);
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('fill', textColor);
                label.setAttribute('fill-opacity', '0.6');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '11');
                const value = Math.round(maxValue - (range / gridLines) * i);
                label.textContent = this.formatNumber(value);
                svg.appendChild(label);
            }
        }

        // Area gradient
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'area-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        gradient.innerHTML = `
            <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="${colors[0]}" stop-opacity="0.05"/>
        `;
        svg.querySelector('defs').appendChild(gradient);

        const points = data.map((d, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight - ((d[yField] - minValue) / range) * chartHeight;
            return { x, y, d };
        });

        // Area
        const areaPathData = `M ${points[0].x} ${padding.top + chartHeight} ` +
            points.map(p => `L ${p.x} ${p.y}`).join(' ') +
            ` L ${points[points.length - 1].x} ${padding.top + chartHeight} Z`;

        const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        area.setAttribute('d', areaPathData);
        area.setAttribute('fill', 'url(#area-gradient)');
        svg.appendChild(area);

        // Line
        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', colors[0]);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        path.classList.add('chart-line');
        svg.appendChild(path);

        // Points
        points.forEach((p, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', colors[0]);
            circle.setAttribute('stroke', this.settings.bgColor);
            circle.setAttribute('stroke-width', '2');
            circle.classList.add('chart-element');
            circle.dataset.label = p.d[xField];
            circle.dataset.value = p.d[yField];
            svg.appendChild(circle);

            if (i % Math.ceil(data.length / 10) === 0 || data.length <= 12) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', p.x);
                label.setAttribute('y', height - padding.bottom + 20);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', textColor);
                label.setAttribute('fill-opacity', '0.6');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '11');
                label.textContent = p.d[xField];
                svg.appendChild(label);
            }

            if (showValues) {
                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', p.x);
                valueLabel.setAttribute('y', p.y - 12);
                valueLabel.setAttribute('text-anchor', 'middle');
                valueLabel.setAttribute('fill', textColor);
                valueLabel.setAttribute('font-family', fontFamily);
                valueLabel.setAttribute('font-size', '10');
                valueLabel.textContent = this.formatNumber(p.d[yField]);
                svg.appendChild(valueLabel);
            }
        });

        this.drawAxes(svg);
    }

    renderPieChart(svg) {
        const { width, height, xField, yField, textColor, fontFamily, showLegend, showValues, showShadow } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const centerX = showLegend ? width * 0.4 : width / 2;
        const centerY = height / 2;
        const radius = Math.min(width * 0.35, height * 0.35);

        const total = data.reduce((sum, d) => sum + d[yField], 0);
        let currentAngle = -Math.PI / 2;

        data.forEach((d, i) => {
            const sliceAngle = (d[yField] / total) * Math.PI * 2;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;

            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);

            const largeArc = sliceAngle > Math.PI ? 1 : 0;

            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('fill', colors[i % colors.length]);
            path.classList.add('chart-element');
            path.dataset.label = d[xField];
            path.dataset.value = d[yField];
            path.dataset.percent = ((d[yField] / total) * 100).toFixed(1);

            if (showShadow) {
                path.setAttribute('filter', 'url(#shadow)');
            }

            svg.appendChild(path);

            // Value label
            if (showValues && sliceAngle > 0.3) {
                const midAngle = startAngle + sliceAngle / 2;
                const labelRadius = radius * 0.65;
                const labelX = centerX + labelRadius * Math.cos(midAngle);
                const labelY = centerY + labelRadius * Math.sin(midAngle);

                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', labelX);
                label.setAttribute('y', labelY);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'middle');
                label.setAttribute('fill', '#ffffff');
                label.setAttribute('font-family', fontFamily);
                label.setAttribute('font-size', '12');
                label.setAttribute('font-weight', '600');
                label.textContent = `${((d[yField] / total) * 100).toFixed(0)}%`;
                svg.appendChild(label);
            }

            currentAngle = endAngle;
        });

        // Legend
        if (showLegend) {
            this.drawLegend(svg, data, colors, width * 0.7, height * 0.2);
        }
    }

    renderDonutChart(svg) {
        const { width, height, xField, yField, textColor, fontFamily, showLegend, showValues } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const centerX = showLegend ? width * 0.4 : width / 2;
        const centerY = height / 2;
        const outerRadius = Math.min(width * 0.35, height * 0.35);
        const innerRadius = outerRadius * 0.6;

        const total = data.reduce((sum, d) => sum + d[yField], 0);
        let currentAngle = -Math.PI / 2;

        data.forEach((d, i) => {
            const sliceAngle = (d[yField] / total) * Math.PI * 2;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;

            const x1Outer = centerX + outerRadius * Math.cos(startAngle);
            const y1Outer = centerY + outerRadius * Math.sin(startAngle);
            const x2Outer = centerX + outerRadius * Math.cos(endAngle);
            const y2Outer = centerY + outerRadius * Math.sin(endAngle);

            const x1Inner = centerX + innerRadius * Math.cos(endAngle);
            const y1Inner = centerY + innerRadius * Math.sin(endAngle);
            const x2Inner = centerX + innerRadius * Math.cos(startAngle);
            const y2Inner = centerY + innerRadius * Math.sin(startAngle);

            const largeArc = sliceAngle > Math.PI ? 1 : 0;

            const pathData = `M ${x1Outer} ${y1Outer} 
                              A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
                              L ${x1Inner} ${y1Inner}
                              A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner} Z`;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('fill', colors[i % colors.length]);
            path.classList.add('chart-element');
            path.dataset.label = d[xField];
            path.dataset.value = d[yField];
            path.dataset.percent = ((d[yField] / total) * 100).toFixed(1);
            svg.appendChild(path);

            currentAngle = endAngle;
        });

        // Center text
        const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText.setAttribute('x', centerX);
        centerText.setAttribute('y', centerY);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.setAttribute('dominant-baseline', 'middle');
        centerText.setAttribute('fill', textColor);
        centerText.setAttribute('font-family', fontFamily);
        centerText.setAttribute('font-size', '24');
        centerText.setAttribute('font-weight', '700');
        centerText.textContent = this.formatNumber(total);
        svg.appendChild(centerText);

        const subText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subText.setAttribute('x', centerX);
        subText.setAttribute('y', centerY + 24);
        subText.setAttribute('text-anchor', 'middle');
        subText.setAttribute('fill', textColor);
        subText.setAttribute('fill-opacity', '0.6');
        subText.setAttribute('font-family', fontFamily);
        subText.setAttribute('font-size', '12');
        subText.textContent = '총계';
        svg.appendChild(subText);

        if (showLegend) {
            this.drawLegend(svg, data, colors, width * 0.7, height * 0.2);
        }
    }

    renderScatterChart(svg) {
        const { width, height, padding, xField, yField, sizeField, textColor, fontFamily, showGrid, showValues } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // Filter only numeric values
        const xValues = data.map(d => parseFloat(d[xField])).filter(v => !isNaN(v));
        const yValues = data.map(d => parseFloat(d[yField])).filter(v => !isNaN(v));

        if (xValues.length === 0 || yValues.length === 0) {
            console.error('Scatter chart requires numeric X and Y fields');
            return;
        }

        let xMin = Math.min(...xValues);
        let xMax = Math.max(...xValues);
        let yMin = Math.min(...yValues);
        let yMax = Math.max(...yValues);

        // Add padding to prevent edge points from being cut off
        const xPadding = (xMax - xMin) * 0.1 || 1;
        const yPadding = (yMax - yMin) * 0.1 || 1;
        xMin -= xPadding;
        xMax += xPadding;
        yMin -= yPadding;
        yMax += yPadding;

        const xRange = xMax - xMin || 1;
        const yRange = yMax - yMin || 1;

        let sizeMin = 5, sizeMax = 20, sizeRange = 15;
        if (sizeField && data[0] && data[0][sizeField] !== undefined) {
            const sizeValues = data.map(d => parseFloat(d[sizeField])).filter(v => !isNaN(v));
            if (sizeValues.length > 0) {
                sizeMin = Math.min(...sizeValues);
                sizeMax = Math.max(...sizeValues);
                sizeRange = sizeMax - sizeMin || 1;
            }
        }

        // Grid
        if (showGrid) {
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding.top + (chartHeight / gridLines) * i;
                const x = padding.left + (chartWidth / gridLines) * i;

                const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                hLine.setAttribute('x1', padding.left);
                hLine.setAttribute('y1', y);
                hLine.setAttribute('x2', width - padding.right);
                hLine.setAttribute('y2', y);
                hLine.setAttribute('stroke', textColor);
                hLine.setAttribute('stroke-opacity', '0.1');
                hLine.setAttribute('stroke-dasharray', '4');
                svg.appendChild(hLine);

                const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                vLine.setAttribute('x1', x);
                vLine.setAttribute('y1', padding.top);
                vLine.setAttribute('x2', x);
                vLine.setAttribute('y2', height - padding.bottom);
                vLine.setAttribute('stroke', textColor);
                vLine.setAttribute('stroke-opacity', '0.1');
                vLine.setAttribute('stroke-dasharray', '4');
                svg.appendChild(vLine);

                // Labels
                const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                yLabel.setAttribute('x', padding.left - 10);
                yLabel.setAttribute('y', y + 4);
                yLabel.setAttribute('text-anchor', 'end');
                yLabel.setAttribute('fill', textColor);
                yLabel.setAttribute('fill-opacity', '0.6');
                yLabel.setAttribute('font-family', fontFamily);
                yLabel.setAttribute('font-size', '11');
                const yLabelValue = yMax - (yRange / gridLines) * i;
                yLabel.textContent = this.formatNumber(Math.round(yLabelValue));
                svg.appendChild(yLabel);

                const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                xLabel.setAttribute('x', x);
                xLabel.setAttribute('y', height - padding.bottom + 20);
                xLabel.setAttribute('text-anchor', 'middle');
                xLabel.setAttribute('fill', textColor);
                xLabel.setAttribute('fill-opacity', '0.6');
                xLabel.setAttribute('font-family', fontFamily);
                xLabel.setAttribute('font-size', '11');
                const xLabelValue = xMin + (xRange / gridLines) * i;
                xLabel.textContent = this.formatNumber(Math.round(xLabelValue));
                svg.appendChild(xLabel);
            }
        }

        // Points
        data.forEach((d, i) => {
            const xVal = parseFloat(d[xField]);
            const yVal = parseFloat(d[yField]);

            if (isNaN(xVal) || isNaN(yVal)) return;

            const x = padding.left + ((xVal - xMin) / xRange) * chartWidth;
            const y = padding.top + chartHeight - ((yVal - yMin) / yRange) * chartHeight;

            let radius = 8;
            if (sizeField && d[sizeField] !== undefined) {
                const sizeVal = parseFloat(d[sizeField]);
                if (!isNaN(sizeVal)) {
                    radius = 5 + ((sizeVal - sizeMin) / sizeRange) * 15;
                }
            }

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', radius);
            circle.setAttribute('fill', colors[i % colors.length]);
            circle.setAttribute('fill-opacity', '0.7');
            circle.setAttribute('stroke', colors[i % colors.length]);
            circle.setAttribute('stroke-width', '2');
            circle.classList.add('chart-element');
            circle.dataset.label = `${xField}: ${d[xField]}`;
            circle.dataset.value = `${yField}: ${d[yField]}`;
            if (sizeField && d[sizeField] !== undefined) {
                circle.dataset.size = `${sizeField}: ${d[sizeField]}`;
            }
            svg.appendChild(circle);
        });

        this.drawAxes(svg);
    }

    renderRadarChart(svg) {
        const { width, height, xField, yField, textColor, fontFamily, showValues } = this.settings;
        const colors = this.palettes[this.palette];
        const data = this.data;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        const levels = 5;
        const sides = data.length;
        const angleStep = (Math.PI * 2) / sides;

        // Draw level circles
        for (let level = 1; level <= levels; level++) {
            const levelRadius = (radius / levels) * level;
            const points = [];

            for (let i = 0; i < sides; i++) {
                const angle = angleStep * i - Math.PI / 2;
                points.push({
                    x: centerX + levelRadius * Math.cos(angle),
                    y: centerY + levelRadius * Math.sin(angle)
                });
            }

            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
            polygon.setAttribute('fill', 'none');
            polygon.setAttribute('stroke', textColor);
            polygon.setAttribute('stroke-opacity', '0.1');
            svg.appendChild(polygon);
        }

        // Draw axis lines and labels
        data.forEach((d, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', centerX);
            line.setAttribute('y1', centerY);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', textColor);
            line.setAttribute('stroke-opacity', '0.2');
            svg.appendChild(line);

            // Label
            const labelX = centerX + (radius + 20) * Math.cos(angle);
            const labelY = centerY + (radius + 20) * Math.sin(angle);

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', labelX);
            label.setAttribute('y', labelY);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('dominant-baseline', 'middle');
            label.setAttribute('fill', textColor);
            label.setAttribute('fill-opacity', '0.8');
            label.setAttribute('font-family', fontFamily);
            label.setAttribute('font-size', '11');
            label.textContent = d[xField];
            svg.appendChild(label);
        });

        // Draw data polygon
        const maxValue = Math.max(...data.map(d => d[yField]));
        const dataPoints = data.map((d, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const value = d[yField] / maxValue;
            return {
                x: centerX + radius * value * Math.cos(angle),
                y: centerY + radius * value * Math.sin(angle),
                d
            };
        });

        const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        dataPolygon.setAttribute('points', dataPoints.map(p => `${p.x},${p.y}`).join(' '));
        dataPolygon.setAttribute('fill', colors[0]);
        dataPolygon.setAttribute('fill-opacity', '0.3');
        dataPolygon.setAttribute('stroke', colors[0]);
        dataPolygon.setAttribute('stroke-width', '2');
        svg.appendChild(dataPolygon);

        // Data points
        dataPoints.forEach((p, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', colors[0]);
            circle.setAttribute('stroke', this.settings.bgColor);
            circle.setAttribute('stroke-width', '2');
            circle.classList.add('chart-element');
            circle.dataset.label = p.d[xField];
            circle.dataset.value = p.d[yField];
            svg.appendChild(circle);

            if (showValues) {
                const angle = angleStep * i - Math.PI / 2;
                const labelX = p.x + 15 * Math.cos(angle);
                const labelY = p.y + 15 * Math.sin(angle);

                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', labelX);
                valueLabel.setAttribute('y', labelY);
                valueLabel.setAttribute('text-anchor', 'middle');
                valueLabel.setAttribute('fill', textColor);
                valueLabel.setAttribute('font-family', fontFamily);
                valueLabel.setAttribute('font-size', '10');
                valueLabel.setAttribute('font-weight', '500');
                valueLabel.textContent = p.d[yField];
                svg.appendChild(valueLabel);
            }
        });
    }

    drawAxes(svg) {
        const { width, height, padding, textColor } = this.settings;

        // X axis
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', padding.left);
        xAxis.setAttribute('y1', height - padding.bottom);
        xAxis.setAttribute('x2', width - padding.right);
        xAxis.setAttribute('y2', height - padding.bottom);
        xAxis.setAttribute('stroke', textColor);
        xAxis.setAttribute('stroke-opacity', '0.3');
        svg.appendChild(xAxis);

        // Y axis
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', padding.left);
        yAxis.setAttribute('y1', padding.top);
        yAxis.setAttribute('x2', padding.left);
        yAxis.setAttribute('y2', height - padding.bottom);
        yAxis.setAttribute('stroke', textColor);
        yAxis.setAttribute('stroke-opacity', '0.3');
        svg.appendChild(yAxis);
    }

    drawLegend(svg, data, colors, x, y) {
        const { xField, yField, textColor, fontFamily } = this.settings;

        data.forEach((d, i) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y + i * 24);
            rect.setAttribute('width', 12);
            rect.setAttribute('height', 12);
            rect.setAttribute('rx', '2');
            rect.setAttribute('fill', colors[i % colors.length]);
            svg.appendChild(rect);

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + 20);
            label.setAttribute('y', y + i * 24 + 10);
            label.setAttribute('fill', textColor);
            label.setAttribute('fill-opacity', '0.8');
            label.setAttribute('font-family', fontFamily);
            label.setAttribute('font-size', '12');
            label.textContent = `${d[xField]} (${this.formatNumber(d[yField])})`;
            svg.appendChild(label);
        });
    }

    applyAnimation(svg) {
        const elements = svg.querySelectorAll('.chart-element');
        const lines = svg.querySelectorAll('.chart-line');
        const { animationDuration, animationDelay, easing } = this.settings;

        switch (this.animation) {
            case 'fadeIn':
                elements.forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.animation = `fadeInScale ${animationDuration}ms ${easing} ${animationDelay + i * 50}ms forwards`;
                });
                lines.forEach(line => {
                    line.style.opacity = '0';
                    line.style.animation = `fadeInScale ${animationDuration}ms ${easing} ${animationDelay}ms forwards`;
                });
                break;

            case 'slideUp':
                elements.forEach((el, i) => {
                    if (el.tagName === 'rect') {
                        el.style.transformOrigin = 'bottom';
                        el.style.transform = 'scaleY(0)';
                        el.style.animation = `slideUp ${animationDuration}ms ${easing} ${animationDelay + i * 50}ms forwards`;
                    }
                });
                break;

            case 'scale':
                elements.forEach((el, i) => {
                    el.style.transformOrigin = 'center';
                    el.style.transform = 'scale(0)';
                    el.style.animation = `fadeInScale ${animationDuration}ms ${easing} ${animationDelay + i * 30}ms forwards`;
                });
                break;

            case 'stagger':
                elements.forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        el.style.transition = `all ${animationDuration}ms ${easing}`;
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, animationDelay + i * 80);
                });
                break;

            case 'draw':
                lines.forEach(line => {
                    const length = line.getTotalLength();
                    line.style.strokeDasharray = length;
                    line.style.strokeDashoffset = length;
                    line.style.animation = `drawLine ${animationDuration}ms ${easing} ${animationDelay}ms forwards`;
                });
                elements.forEach((el, i) => {
                    if (el.tagName === 'circle') {
                        el.style.opacity = '0';
                        el.style.transform = 'scale(0)';
                        setTimeout(() => {
                            el.style.transition = `all 300ms ${easing}`;
                            el.style.opacity = '1';
                            el.style.transform = 'scale(1)';
                        }, animationDelay + animationDuration * 0.7 + i * 50);
                    }
                });
                break;
        }
    }

    bindInteractions(svg) {
        const elements = svg.querySelectorAll('.chart-element');
        const tooltip = document.getElementById('tooltip');

        elements.forEach(el => {
            if (this.settings.enableHover) {
                el.addEventListener('mouseenter', (e) => {
                    el.style.filter = 'brightness(1.2)';
                    el.style.transform = 'scale(1.05)';
                });

                el.addEventListener('mouseleave', () => {
                    el.style.filter = '';
                    el.style.transform = '';
                    tooltip.classList.remove('visible');
                });
            }

            if (this.settings.enableTooltip) {
                el.addEventListener('mousemove', (e) => {
                    const label = el.dataset.label;
                    const value = el.dataset.value;
                    const percent = el.dataset.percent;
                    const size = el.dataset.size;

                    let html = `<div class="tooltip-label">${label}</div>`;
                    html += `<div class="tooltip-value">${this.formatNumber(value)}</div>`;
                    if (percent) {
                        html += `<div class="tooltip-value" style="font-size:0.8em;opacity:0.7">${percent}%</div>`;
                    }
                    if (size) {
                        html += `<div class="tooltip-value" style="font-size:0.8em;opacity:0.7">${size}</div>`;
                    }

                    tooltip.innerHTML = html;
                    tooltip.style.left = e.clientX + 15 + 'px';
                    tooltip.style.top = e.clientY + 15 + 'px';
                    tooltip.classList.add('visible');
                });
            }

            if (this.settings.enableClick) {
                el.addEventListener('click', () => {
                    elements.forEach(e => e.classList.remove('highlighted'));
                    el.classList.toggle('highlighted');
                });
            }
        });
    }

    formatNumber(num) {
        if (typeof num === 'string') return num;
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString();
    }

    downloadSVG() {
        const svg = document.querySelector('.chart-svg');
        if (!svg) {
            alert('다운로드할 차트가 없습니다.');
            return;
        }

        // Clone SVG and add styles
        const clone = svg.cloneNode(true);

        // Add inline styles
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = `
            .chart-element { transition: none; }
            @keyframes fadeInScale { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            @keyframes slideUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
        `;
        clone.insertBefore(style, clone.firstChild);

        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(clone);

        // Add XML declaration
        source = '<?xml version="1.0" encoding="UTF-8"?>\n' + source;

        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `chart-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);

        // Update default colors based on theme
        if (newTheme === 'light') {
            document.getElementById('bgColor').value = '#ffffff';
            document.getElementById('bgColorText').value = '#ffffff';
            document.getElementById('textColor').value = '#1a1a2e';
            document.getElementById('textColorText').value = '#1a1a2e';

            // Set Sun icon for Light theme (optional: some users prefer showing the current state icon)
            // But usually, it's better to show what it WILL become, or just the current state.
            // Let's show the Sun icon while in Light mode and Moon icon while in Dark mode as requested.
            document.getElementById('toggleTheme').innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            `;
        } else {
            document.getElementById('bgColor').value = '#1a1a2e';
            document.getElementById('bgColorText').value = '#1a1a2e';
            document.getElementById('textColor').value = '#ffffff';
            document.getElementById('textColorText').value = '#ffffff';

            // Set Moon icon for Dark theme
            document.getElementById('toggleTheme').innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
        }

        this.updateSettings();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.visualizer = new SVGVisualizer();
});

