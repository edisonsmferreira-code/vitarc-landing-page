/*
Design reminder — Luxury Emergency Noir:
Página RCP da Vitarc. Dois modos: Emergência (vermelho urgente, tudo visível) e Aprendizado (noir premium, educativo).
Metrônomo interativo a 110 bpm com animação pulsante. Foco em clareza, urgência e acessibilidade.
*/

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Heart,
  HeartPulse,
  Pause,
  Phone,
  Play,
  Shield,
  Video,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";

const LOGO = "/manus-storage/logo-vitarc-branca_beaee753.png";
const BPM = 110;
const INTERVAL_MS = Math.round(60000 / BPM); // ~545ms

const steps = [
  {
    num: "01",
    title: "Verifique a segurança do local",
    desc: "Certifique-se de que você e a vítima estão em um ambiente seguro antes de iniciar.",
    icon: Shield,
  },
  {
    num: "02",
    title: "Cheque a resposta da vítima",
    desc: "Toque nos ombros e fale alto: 'Você está bem?' — Se não houver resposta, chame ajuda imediatamente.",
    icon: HeartPulse,
  },
  {
    num: "03",
    title: "Acione o socorro",
    desc: "Ligue 192 (SAMU) ou peça para alguém fazer isso. Solicite que tragam um DEA.",
    icon: Phone,
  },
  {
    num: "04",
    title: "Verifique a respiração",
    desc: "Olhe, ouça e sinta por até 10 segundos. Se não estiver respirando normalmente, comece a RCP.",
    icon: Activity,
  },
  {
    num: "05",
    title: "Inicie as compressões torácicas",
    desc: "Coloque a base da mão no centro do peito. Braços estendidos. 100–120 compressões/min, 5 cm de profundidade. 30 compressões para 2 ventilações.",
    icon: Heart,
  },
  {
    num: "06",
    title: "Use o DEA assim que disponível",
    desc: "Ligue o aparelho e siga as instruções de voz. Coloque as pás conforme o desenho. Afaste-se na análise. Se indicar choque, aperte o botão e retome a RCP.",
    icon: Zap,
  },
  {
    num: "07",
    title: "Continue até o socorro chegar",
    desc: "Mantenha a RCP até a chegada do SAMU, a vítima apresentar sinais de vida, ou você ficar sem condições de prosseguir.",
    icon: CheckCircle2,
  },
];

function Metronome() {
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(false);
  const [count, setCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (!soundOn) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }, [soundOn]);

  const tick = useCallback(() => {
    setBeat(true);
    setCount(c => c + 1);
    playClick();
    setTimeout(() => setBeat(false), 120);
  }, [playClick]);

  const toggle = () => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
      setCount(0);
    } else {
      setRunning(true);
      tick();
      intervalRef.current = setInterval(tick, INTERVAL_MS);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const displayCount = count > 30 ? (((count - 1) % 30) + 1) : count;

  return (
    <div className="metronome-card">
      <div className="metronome-header">
        <span className="metronome-label"><Activity size={16} /> METRÔNOMO DE COMPRESSÕES</span>
        <span className="metronome-bpm">{BPM} BPM</span>
      </div>

      <div className={`metronome-pulse ${beat ? "metronome-pulse--beat" : ""} ${running ? "metronome-pulse--running" : ""}`}>
        <div className="metronome-ring metronome-ring--3" />
        <div className="metronome-ring metronome-ring--2" />
        <div className="metronome-ring metronome-ring--1" />
        <div className="metronome-core">
          <Heart size={36} className={beat ? "metronome-heart--beat" : ""} />
          {running && <span className="metronome-count">{displayCount}</span>}
        </div>
      </div>

      <p className="metronome-instruction">
        {running
          ? "Comprima o peito no ritmo do pulso — fundo e firme!"
          : "Pressione INICIAR e comprima o peito no ritmo do pulso"}
      </p>

      <div className="metronome-actions">
        <button className={`metronome-btn ${running ? "metronome-btn--stop" : "metronome-btn--start"}`} onClick={toggle}>
          {running ? <><Pause size={20} /> PAUSAR</> : <><Play size={20} /> INICIAR METRÔNOMO</>}
        </button>
        <button className="metronome-sound-btn" onClick={() => setSoundOn(s => !s)} title={soundOn ? "Silenciar" : "Ativar som"}>
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <p className="metronome-note">100–120 compressões por minuto · 5 cm de profundidade · Permita o retorno total do peito</p>
    </div>
  );
}

function RcpVideoLesson({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`rcp-video-section ${compact ? "rcp-video-section--compact" : ""}`} aria-labelledby="video-rcp-title">
      <div className="rcp-video-heading">
        <span className="eyebrow"><Video size={16} /> Demonstração prática</span>
        <h2 id="video-rcp-title">ASSISTA E ENTENDA O PASSO A PASSO</h2>
        <p>Veja como reconhecer a emergência, iniciar a RCP e usar o DEA com mais segurança.</p>
      </div>
      <div className="rcp-video-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/vYsLLpw_ymI?rel=0"
          title="Guia prático de RCP e uso do DEA"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export default function Rcp() {
  const [mode, setMode] = useState<"emergency" | "learn">("emergency");

  return (
    <div className="rcp-page">
      {/* Header */}
      <header className="rcp-header">
        <Link href="/" className="rcp-logo">
          <img src={LOGO} alt="Vitarc" />
        </Link>
        <a href="tel:192" className="rcp-samu-pill">
          <Phone size={14} /> SAMU 192
        </a>
      </header>

      {/* Mode Toggle */}
      <div className="rcp-mode-toggle">
        <button
          className={`rcp-mode-btn ${mode === "emergency" ? "rcp-mode-btn--active" : ""}`}
          onClick={() => setMode("emergency")}
        >
          <AlertTriangle size={16} /> EMERGÊNCIA AGORA
        </button>
        <button
          className={`rcp-mode-btn ${mode === "learn" ? "rcp-mode-btn--active" : ""}`}
          onClick={() => setMode("learn")}
        >
          <BookOpen size={16} /> APRENDER COM CALMA
        </button>
      </div>

      {/* ─── EMERGENCY MODE ─── */}
      {mode === "emergency" && (
        <main className="rcp-emergency">
          {/* SOS Banner */}
          <section className="rcp-sos">
            <div className="rcp-sos-pulse" />
            <div className="rcp-sos-content">
              <p className="rcp-sos-label"><AlertTriangle size={18} /> EMERGÊNCIA CARDÍACA</p>
              <h1 className="rcp-sos-title">LIGUE AGORA</h1>
              <a href="tel:192" className="rcp-sos-btn">
                <Phone size={28} /> 192 — SAMU
              </a>
              <p className="rcp-sos-sub">Peça ajuda e um DEA enquanto inicia a RCP</p>
            </div>
          </section>

          {/* Quick Steps */}
          <section className="rcp-quick-steps">
            <h2 className="rcp-section-title">7 PASSOS RÁPIDOS</h2>
            <div className="rcp-steps-grid">
              {steps.map((s) => (
                <div key={s.num} className="rcp-step-card">
                  <span className="rcp-step-num">{s.num}</span>
                  <div>
                    <p className="rcp-step-title">{s.title}</p>
                    <p className="rcp-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Metronome */}
          <section className="rcp-metronome-section">
            <h2 className="rcp-section-title">RITMO DAS COMPRESSÕES</h2>
            <Metronome />
          </section>

          <RcpVideoLesson compact />

          {/* Switch to learn */}
          <div className="rcp-switch-cta">
            <p>Não está em emergência?</p>
            <button onClick={() => setMode("learn")} className="rcp-switch-btn">
              Aprenda com calma <ChevronDown size={16} />
            </button>
          </div>
        </main>
      )}

      {/* ─── LEARN MODE ─── */}
      {mode === "learn" && (
        <main className="rcp-learn">
          {/* Hero */}
          <section className="rcp-learn-hero">
            <span className="eyebrow"><Activity size={16} /> O arco que reinicia a vida</span>
            <h1 className="rcp-learn-title">APRENDA A SALVAR<br />UMA VIDA</h1>
            <p className="rcp-learn-sub">
              Em situações de parada cardiorrespiratória, cada segundo conta. A RCP e o uso do DEA aumentam significativamente as chances de sobrevivência. Aqui você vai entender o que são, quando usar e como agir de forma rápida e segura.
            </p>
            <div className="rcp-learn-hero-actions">
              <button onClick={() => setMode("emergency")} className="cta-button">
                <span><AlertTriangle size={16} /> Modo Emergência</span>
              </button>
              <a href="https://wa.me/5511911440179" target="_blank" rel="noreferrer" className="rcp-outline-btn">
                <GraduationCap size={16} /> Quero Treinamento
              </a>
            </div>
          </section>

          {/* What is RCP / DEA */}
          <section className="rcp-concepts">
            <div className="rcp-concept-card rcp-concept-card--rcp">
              <div className="rcp-concept-icon"><Heart size={32} /></div>
              <h3>O que é RCP?</h3>
              <p>
                <strong>Ressuscitação Cardiopulmonar</strong> é um procedimento de emergência que combina compressões torácicas e ventilação artificial para manter o fluxo sanguíneo e a oxigenação do corpo em casos de parada cardiorrespiratória, até a chegada do SAMU.
              </p>
              <div className="rcp-concept-badge">Objetivo: manter a vida até o socorro chegar</div>
            </div>
            <div className="rcp-concept-card rcp-concept-card--dea">
              <div className="rcp-concept-icon"><Zap size={32} /></div>
              <h3>O que é DEA?</h3>
              <p>
                <strong>Desfibrilador Externo Automático</strong> é um dispositivo portátil que analisa o ritmo cardíaco e, se necessário, administra um choque elétrico para restaurar o ritmo normal do coração. É fácil de usar — qualquer pessoa pode operar.
              </p>
              <div className="rcp-concept-badge">Ponto-chave: Qualquer pessoa pode usar o DEA!</div>
            </div>
          </section>

          <RcpVideoLesson />

          {/* Step by step detailed */}
          <section className="rcp-steps-detailed">
            <h2 className="rcp-section-title">PASSO A PASSO COMPLETO</h2>
            <div className="rcp-steps-list">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="rcp-step-detailed">
                    <div className="rcp-step-detailed-icon">
                      <Icon size={24} />
                    </div>
                    <div className="rcp-step-detailed-body">
                      <div className="rcp-step-detailed-header">
                        <span className="rcp-step-num">{s.num}</span>
                        <h4>{s.title}</h4>
                      </div>
                      <p>{s.desc}</p>
                      {s.num === "05" && (
                        <div className="rcp-compression-specs">
                          <span><strong>Profundidade:</strong> ~5 cm</span>
                          <span><strong>Frequência:</strong> 100–120/min</span>
                          <span><strong>Ciclo:</strong> 30 compressões : 2 ventilações</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Metronome */}
          <section className="rcp-metronome-section">
            <h2 className="rcp-section-title">TREINE O RITMO</h2>
            <p className="rcp-section-sub">Use o metrônomo para praticar o ritmo correto das compressões torácicas</p>
            <Metronome />
          </section>

          {/* CTA Training */}
          <section className="rcp-training-cta">
            <div className="rcp-training-cta-inner">
              <span className="eyebrow"><GraduationCap size={16} /> Treinamento Certificado</span>
              <h2>Você sabia que pode solicitar um treinamento com simulação e certificação?</h2>
              <p>Entre em contato com a equipe Vitarc e prepare sua equipe para agir com segurança em emergências cardíacas.</p>
              <a href="https://wa.me/5511911440179" target="_blank" rel="noreferrer" className="cta-button">
                <span>Quero Treinamento</span>
              </a>
            </div>
          </section>

          {/* Legal warning */}
          <section className="rcp-legal">
            <AlertTriangle size={18} />
            <p>
              <strong>Aviso Importante:</strong> As orientações apresentadas nesta página têm caráter educativo e não substituem treinamento prático em primeiros socorros. Em uma situação de emergência, sempre acione o SAMU pelo número <strong>192</strong> antes de iniciar o atendimento. A ConstaMed recomenda que todos realizem cursos certificados de RCP e uso do DEA para garantir mais segurança e eficácia no atendimento.
            </p>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="rcp-footer">
        <div className="rcp-footer-inner">
          <img src={LOGO} alt="Vitarc" className="rcp-footer-logo" />
          <p>A Vitarc é uma marca da ConstaMed · <a href="https://vitarc.com.br">vitarc.com.br</a></p>
          <a href="tel:192" className="rcp-samu-pill">
            <Phone size={13} /> SAMU 192
          </a>
        </div>
      </footer>
    </div>
  );
}
