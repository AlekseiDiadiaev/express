import './spinner.css'

const Spinner = ({ size = "36px", className = '' }: { size?: string; className?: string }) => {
    return (
        <div className={"spinner " + className}>
            <svg width={size} height={size} viewBox="0 0 24 24">
                <rect className="spinner_hzlK" x="1" y="1" width="6" height="22" />
                <rect className="spinner_hzlK spinner_koGT" x="9" y="1" width="6" height="22" />
                <rect className="spinner_hzlK spinner_YF1u" x="17" y="1" width="6" height="22" />
            </svg>
        </div>
    )
}

export default Spinner;