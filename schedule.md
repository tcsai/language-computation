# Seminar schedule

Talks shown on the Seminar page. To add a talk, copy a block and fill it in.
Write dates as YYYY-MM-DD. The order of the blocks does not matter: the page
lists upcoming talks first and moves each talk to the past ones the day after
it takes place. Time (e.g. 12:30-13:00) and Room are optional. Title and
Abstract can stay empty until known; an abstract can run over several lines,
with a blank line between paragraphs.

Date: 2027-01-21
Time: 12:30-13:30
Room: D 152 A
Speaker: Albert Gatt
Title:

Date: 2026-09-17
Speaker: Gaofei Shen
Title: Representational Differences Explanations for spoken language models.
Abstract: Representational similarity analysis tells us whether two spaces look
alike. Neither describes the structure of the difference itself. In this
talk I present the work in progress from my research visit to the
University of Edinburgh on Representational Difference Explanations (RDX;
Kondapaneni et al., 2025), a method from computer vision that clusters
the stimuli which two models represent differently. We adapt RDX to
speech and apply it in layerwise comparisons between wav2vec2-base and
the ASR-fine-tuned wav2vec2, HuBERT-base, an AudioSet-trained wav2vec2,
Whisper-small, and a random-weight wav2vec2 as control, on the same TIMIT dataset.
Different model pairs produce different layerwise profiles in terms of
how the organization of their internal representations differs. Alongside
a curated inventory of audio- and text-based features, we also found that
some of these automatically discovered clusters do not correspond to any
label in that inventory. To address this, we are attempting to use an
LLM-assisted method to help label the clusters with statistical
cross-checks.

Date: 2026-10-08
Time: 12:30-13:30
Room: D 152 A
Speaker: Hosein Mohebbi
Title: Efficient and Interpretable Models of Spoken Language with Adaptive Context Compression
Abstract: This talk explores adaptive compute for audio context compression. We
introduce a method to progressively shorten the sequence of acoustic
frames as they pass through successive model layers. By dynamically
merging redundant temporal frames, our approach physically reduces the
context length at inference time, yielding tangible latency
improvements. A major focus of the talk will be the techniques used to
guarantee strict train-inference consistency despite physically merging
and removing these frames. I will share evaluations on OpenAI's Whisper
model across ASR and Speech Translation tasks, showing that adaptive
context compression consistently outperforms static baselines like
LayerDrop and Distillation, maintaining or even improving original model
performance, while eliminating 50–70% of candidate frames and yielding
significant inference speedups.

Date: 2026-10-29
Time: 12:30-13:30
Room: D 152 A
Speaker: Bruno Nicenboim
Title: All models are wrong, and so is model comparison
Abstract: A central goal of cognitive science, and of any field that
formalizes its theories, is to determine which theory best and most
accurately explains a set of phenomena. Researchers often implement
competing theories as computational models and use model comparison
techniques to evaluate the merits of the models as proxies for the
theories.

Model comparison has important limitations when all candidate models are
misspecified, a situation that is virtually guaranteed in real-world
applications but is often downplayed or plainly ignored. I illustrate
these problems with a simulation. I generated response times and choices
from a known race process and fit three kinds of misspecified models to
them: (1) models structurally similar to the "true" model but with wrong
peripheral (or auxiliary) assumptions, (2) a model that assumes a
qualitatively different mechanism, and (3) theory-agnostic statistical
models. I then ranked the models with Bayes factors and cross-validation.
The simulation shows that the rankings depended on which aspect of the
data was modeled, which peripheral assumptions were implemented, and which
comparison method was used. The best predictions did not always come from
the model closest to the truth. In a real application, moreover, we would
not know which situation we were in, whether we had all the relevant data,
or how sensitive our comparison was to peripheral assumptions. The case
study uses Bayesian cognitive models, but the problem affects any model
comparison, whether it relies on Bayes factors, cross-validation,
information criteria, or held-out benchmarks. All of these tools rank
models according to statistical criteria that do not, by themselves,
establish which theory is closer to the truth. Turning model rankings into
claims about theories therefore requires arguments that go beyond
statistics. I close with suggestions for using model comparison as a
diagnostic tool: separating core from peripheral assumptions, choosing
informative data and severe tests, and building shared benchmarks so that
evidence accumulates across studies.

Date: 2026-11-12
Time: 12:45-13:45
Room: MKZ 221
Speaker: Sara Østergaard
Title:
Abstract:

Date: 2026-11-26
Time: 12:30-13:30
Room: D 152 A
Speaker: Thomas Lieber
Title: Piecewise additive methods
Abstract:

Date: 2026-12-10
Time: 12:30-13:30
Room: D 152 A
Speaker: Grzegorz Chrupała
Title: The rise and evolution of a referential code in populations of bee-like agents
Abstract:
Communication typically relies on a shared code, and any change to it must be coordinated between senders and receivers to avoid a breakdown of communication. The honeybee waggle dance illustrates this problem: species with horizontal combs point directly at a food source, while species with vertical combs cannot point directly and instead reference the dance to gravity, decoded against the position of the sun. We model the rise of the first of these codes and its evolutionary transition to the second in populations of bee-like agents, with selection acting at the level of colonies. In a horizontal-comb model, we find that direct pointing evolves readily when food is moderately hard to find by random search alone, whether because sites are few and large or many and small. Communication fails to evolve when food is too sparse to spark dances or so abundant that it is found without signaling. Adding an exogenous benefit for vertical combs, we then find that the transition to the gravity-referenced code is driven mainly by the magnitude of this benefit and by the mutation scale, with the coupling between sender and receiver mutations playing a further role when the mutation scale is low. Given a favorable confluence of these factors, the transition proceeds reliably and without a breakdown of communication. Outside that confluence it remains possible, though rarer, across a much wider range of settings.
