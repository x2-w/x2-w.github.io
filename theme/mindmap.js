(function () {
    let initialized = false;
    function parseMindMap(text) {
        const lines = text
            .split('\n')
            .filter(v => v.trim());

        if (lines.length === 0) {
            return {
                data: {
                    text: "Empty"
                },
                children: []
            };
        }

        const root = {
            data: {
                text: lines[0].trim()
            },
            children: []
        };

        const stack = [{
            indent: -1,
            node: root
        }];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const indent =
                line.match(/^ */)[0].length;
            const text =
                line.trim();
            const node = {
                data: {
                    text
                },
                children: []
            };

            while (
                stack.length &&
                indent <= stack[stack.length - 1].indent
            ) {
                stack.pop();
            }

            stack[stack.length - 1]
                .node
                .children
                .push(node);

            stack.push({
                indent,
                node
            });
        }

        return root;
    }

    function renderMindMaps() {
        const MindMap = window.simpleMindMap?.default || window.simpleMindMap;
        if (!MindMap) {
            console.error("simpleMindMap not loaded");
            return;
        }

        document.querySelectorAll('pre code.language-mindmap')
            .forEach((block, idx) => {
                if (block.dataset.mindmapRendered) {
                    return;
                }

                block.dataset.mindmapRendered = "1";
                const text = block.textContent;
                const container = document.createElement('div');
                container.className = 'mindmap-container';
                const wrapper = document.createElement('div');
                wrapper.className = 'mindmap-wrapper';
                wrapper.appendChild(container);
                block.parentElement.replaceWith(wrapper);

                const data = parseMindMap(text);

                const dark = document.body.classList.contains('dark') || document.body.classList.contains('ayu');

                const mindMap = new MindMap({
                    el: container,
                    data,
                    layout: 'logicalStructure',
                    theme: dark ? 'dark' : 'default',
                    editable: false,
                    mousewheelAction: 'zoom',
                    useLeftKeySelectionRightKeyDrag: false,
                    useRichText: false,
                    // 单边展开（关键）
                    initRootNodePosition: ['left', 'center'],
                    themeConfig: {
                        lineStyle: 'straight',
                        rootLineKeepSameInCurve: true,
                        lineWidth: 2,
                        lineColor: '#4db6ac',
                        nodeBorderRadius: 8,
                        lineRadius: 16
                    }
                });
                setTimeout(() => {
                    try {
                        // 左移
                        mindMap.view.translateX(50);
                    } catch (e) {}
                }, 300);

                function resize() {
                    try {
                        mindMap.resize();
                    } catch (e) {}
                }

                window.addEventListener(
                    'resize',
                    resize
                );
            });
    }

    function init() {
        renderMindMaps();
        observePageChanges();
    }

    function observePageChanges() {
        const observer = new MutationObserver(() => {
                renderMindMaps();
            });

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }

    if (!initialized) {
        initialized = true;
        window.addEventListener(
            'load',
            init
        );

        document.addEventListener(
            'DOMContentLoaded',
            init
        );
    }
})();