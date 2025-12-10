export default function SubwayLegend() {
    return(
    <div className="mt-12 pt-8 border-t border-slate-200">
    <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
        <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-500" />
        <span>완료</span>
        </div>
        <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-500" />
        <span>진행중</span>
        </div>
        <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-slate-300" />
        <span>잠김</span>
        </div>
    </div>
    </div>
    )
}