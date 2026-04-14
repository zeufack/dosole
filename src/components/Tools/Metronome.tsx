import { useEffect, useRef, useState } from "react";
import * as Tone from 'tone'

export function Metronome() {

    const [bpm, setBpm] = useState(80);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatPerBar, setBeatPerBar] = useState(4);
    const [accentOnFirstBeat, setAccentOnFirstBeat] = useState(true);
    const [currentBeat, setCurrentBeat] = useState(0);
    const beatCountRef = useRef(0);
    const beatPerBarRef = useRef(beatPerBar)
    const tapTimestampsRef = useRef<number[]>([])
    const accentOnFirstBeatRef = useRef(accentOnFirstBeat)


    const synthRef = useRef<Tone.Synth | null>(null)
    const loopRef = useRef<Tone.Loop | null>(null)

    const togglePlay = async () => {
        if (isPlaying) {
            Tone.getTransport().stop();
            loopRef.current?.dispose();
            loopRef.current = null;
            synthRef.current?.dispose();
            synthRef.current = null;
            setCurrentBeat(0);
        } else {
            if (!synthRef.current) {
                synthRef.current = new Tone.Synth().toDestination();
            }
            if (!loopRef.current) {
                loopRef.current = new Tone.Loop(time => {
                    const isAccent = accentOnFirstBeatRef.current && beatCountRef.current === 0
                    synthRef.current?.triggerAttackRelease(isAccent ? 'C5' : 'C4', '16n', time)
                    beatCountRef.current = (beatCountRef.current + 1) % beatPerBarRef.current
                    setCurrentBeat(beatCountRef.current)
                }, "4n");
            }
            await Tone.start();
            loopRef.current.start(0);
            Tone.getTransport().start();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTap = () => {
        const now = Date.now();
        const taps = tapTimestampsRef.current;

        if (taps.length > 0 && now - taps[taps.length - 1] > 2000) {
            tapTimestampsRef.current = [];
        }
        tapTimestampsRef.current.push(now);
        if (tapTimestampsRef.current.length > 8) {
            tapTimestampsRef.current = tapTimestampsRef.current.slice(-8);
        }
        if (tapTimestampsRef.current.length > 1) {
            const taps = tapTimestampsRef.current;
            const intervals = taps.slice(1).map((t, i) => t - taps[i]);
            const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const newBpm = Math.round(60000 / averageInterval);
            setBpm(newBpm);
        }
    }

    useEffect(() => {
        Tone.getTransport().bpm.value = bpm;
    }, [bpm]);

    useEffect(() => {
        accentOnFirstBeatRef.current = accentOnFirstBeat
    }, [accentOnFirstBeat])

    useEffect(() => {
        beatPerBarRef.current = beatPerBar
    }, [beatPerBar])

    useEffect(() => {
        return () => {
            loopRef.current?.dispose()
            synthRef.current?.dispose()
            Tone.getTransport().stop()
        }
    }, [])

    return (
        <div className="island-shell">
            <h2>Metronome</h2>
            <div >
                <div >
                    <label htmlFor="bpm">BPM:</label>
                    <input type="range" id="bpm" min="40" max="240" value={bpm} onChange={(e) => setBpm(parseInt(e.target.value))} />
                    <span>{bpm}</span>
                </div>
                <div >
                    <label>Current Beat:</label>
                    {accentOnFirstBeat && currentBeat === 0 ? <strong>{currentBeat + 1}</strong> : <span>{currentBeat + 1}</span>}
                </div>
                <div >
                    <label htmlFor="beatPerBar">Beats per Bar:</label>
                    {[2, 3, 4, 6].map(n => (
                        <button key={n} onClick={() => setBeatPerBar(n)}>
                            {n}
                        </button>
                    ))}
                </div>
                <div>
                    <label htmlFor="accentOnFirstBeat">Accent on First Beat:</label>
                    <input type="checkbox" id="accentOnFirstBeat" checked={accentOnFirstBeat} onChange={(e) => setAccentOnFirstBeat(e.target.checked)} />
                </div>
                <button onClick={() => togglePlay()}>{isPlaying ? "Stop" : "Start"}</button>
                <button onClick={() => handleTap()}>Tap Tempo</button>
            </div>
        </div>
    );
}