import { useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";

const defaultDefects = [
  { id: "d1", x: -30, y: 20 },
  { id: "d2", x: 40, y: -10 },
];

export default function App() {
  const [rectWidth, setRectWidth] = useState(200);
  const [rectHeight, setRectHeight] = useState(120);
  const [marginPercent, setMarginPercent] = useState(20);
  const [dotSize, setDotSize] = useState(6);
  const [dotColor, setDotColor] = useState("#ef4444");
  const [defects, setDefects] = useState(defaultDefects);
  const [newX, setNewX] = useState(0);
  const [newY, setNewY] = useState(0);

  const canvas = useMemo(() => {
    const scale = 1 + marginPercent / 100;
    return {
      width: rectWidth * scale,
      height: rectHeight * scale,
    };
  }, [rectWidth, rectHeight, marginPercent]);

  const viewBox = `${-canvas.width / 2} ${-canvas.height / 2} ${canvas.width} ${canvas.height}`;

  const addDefect = () => {
    const id = `d-${Date.now()}`;
    setDefects((prev) => [...prev, { id, x: Number(newX), y: Number(newY) }]);
  };

  const removeDefect = (id) => {
    setDefects((prev) => prev.filter((item) => item.id !== id));
  };

  const resetDefects = () => {
    setDefects([]);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <h1 className="text-2xl font-semibold">疵点图绘制</h1>
          <p className="mt-2 text-sm text-slate-600">
            以长方形中心为原点，输入疵点坐标，即可在白色画布上显示红点。
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <section className="rounded-lg border border-slate-200 p-5 shadow-sm">
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold">长方形参数</h2>
                <p className="text-xs text-slate-500">单位可以自行定义。</p>
              </div>

              <div className="grid gap-3">
                <div className="space-y-1">
                  <Label htmlFor="rect-width">长 (宽度)</Label>
                  <Input
                    id="rect-width"
                    type="number"
                    min="1"
                    value={rectWidth}
                    onChange={(event) => setRectWidth(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rect-height">宽 (高度)</Label>
                  <Input
                    id="rect-height"
                    type="number"
                    min="1"
                    value={rectHeight}
                    onChange={(event) => setRectHeight(Number(event.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="margin">画布扩展比例</Label>
                  <span className="text-sm text-slate-600">{marginPercent}%</span>
                </div>
                <Slider
                  id="margin"
                  min={0}
                  max={100}
                  step={1}
                  value={[marginPercent]}
                  onValueChange={(value) => setMarginPercent(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dot-size">疵点大小</Label>
                  <span className="text-sm text-slate-600">{dotSize}px</span>
                </div>
                <Slider
                  id="dot-size"
                  min={2}
                  max={20}
                  step={1}
                  value={[dotSize]}
                  onValueChange={(value) => setDotSize(value[0])}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dot-color">疵点颜色</Label>
                <Input
                  id="dot-color"
                  type="color"
                  value={dotColor}
                  onChange={(event) => setDotColor(event.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold">疵点列表</h2>
                <p className="text-xs text-slate-500">输入坐标并添加，支持多个疵点。</p>
              </div>
              <Button variant="outline" size="sm" onClick={resetDefects}>
                清空疵点
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <Label htmlFor="defect-x">X 坐标</Label>
                <Input
                  id="defect-x"
                  type="number"
                  value={newX}
                  onChange={(event) => setNewX(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="defect-y">Y 坐标</Label>
                <Input
                  id="defect-y"
                  type="number"
                  value={newY}
                  onChange={(event) => setNewY(event.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full" onClick={addDefect}>
                  添加疵点
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {defects.length === 0 ? (
                <p className="text-sm text-slate-500">暂无疵点。</p>
              ) : (
                defects.map((defect, index) => (
                  <div
                    key={defect.id}
                    className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                  >
                    <span>
                      #{index + 1} — X: {defect.x}, Y: {defect.y}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDefect(defect.id)}
                    >
                      移除
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">画布预览</h2>
              <p className="text-xs text-slate-500">
                画布大小为长方形的 {marginPercent}% 扩展。
              </p>
            </div>
            <div className="text-xs text-slate-500">
              画布: {Math.round(canvas.width)} × {Math.round(canvas.height)}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-md border border-dashed border-slate-200 bg-white p-4">
            <svg
              className="max-h-[420px] w-full"
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
            >
              <rect
                x={-canvas.width / 2}
                y={-canvas.height / 2}
                width={canvas.width}
                height={canvas.height}
                fill="white"
              />
              <g transform="scale(1,-1)">
                <rect
                  x={-rectWidth / 2}
                  y={-rectHeight / 2}
                  width={rectWidth}
                  height={rectHeight}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                {defects.map((defect) => (
                  <circle
                    key={defect.id}
                    cx={defect.x}
                    cy={defect.y}
                    r={dotSize}
                    fill={dotColor}
                  />
                ))}
              </g>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
