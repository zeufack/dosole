import { useRef, useState } from "react";
import * as Tone from 'tone'

export function Metronome() {

    const [bpm, setBpm] = useState(80);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatPerBar, setBeatPerBar] = useState(4);
    const [accentOnFirstBeat, setAccentOnFirstBeat] = useState(true);
    const [currentBeat, setCurrentBeat] = useState(0);


    const synthRef = useRef<Tone.Synth | null>(null)
    const loopRef = useRef<Tone.Loop | null>(null)

    const togglePlay = async () => {
        if (isPlaying) {
            loopRef.current?.stop();
            setCurrentBeat(0);
        } else {
            if (!synthRef.current) {
                synthRef.current = new Tone.Synth().toDestination();
            }
            if (!loopRef.current) {
                loopRef.current = new Tone.Loop(time => {
                    const isAccent = accentOnFirstBeat && currentBeat === 0;
                    synthRef.current?.triggerAttackRelease(isAccent ? "C4" : "G3", "8n", time);
                    setCurrentBeat(prev => (prev + 1) % beatPerBar);
                }, "4n");
            }
            await Tone.start();
            loopRef.current.start(0);
        }
        setIsPlaying(!isPlaying);
    };

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
            </div>
        </div>
    );
}