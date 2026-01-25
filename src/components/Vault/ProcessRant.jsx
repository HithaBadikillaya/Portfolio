
const ProcessRant = ({ yellowAccent }) => {
    return (
        <section className="mt-8 p-6 md:p-8 bg-black border-2 rounded-md" style={{ borderColor: yellowAccent }}>
            <h3 className="font-black uppercase text-white tracking-widest mb-3">how i actually build things</h3>

            <p className="text-white/85 mb-3">I sketch, I panic, I over-index on coffee, then I ship. If it breaks, it's a feature; if it works, it's witchcraft. This is the part I keep in the vault so the internet can have a good laugh at my process.</p>

            <p className="text-white/80 mb-2">The workflow (unedited): an idea appears, I whiteboard two terrible diagrams, I open a repo and immediately create ten branches because optimism is a verb. I prototype with reckless copy-paste energy at 2am, fueled by the kind of playlist that says "questionable decisions, LLC." Tests are an emotional negotiation — sometimes they get written, sometimes they get guilted into existence three weeks later.</p>

            <p className="text-white/80 mb-2">Collaboration is a sport: I pair when it helps, I ping teammates in the morning with a standup that is 60% emoji and 40% actual status, and I embrace code reviews like unsolicited therapy. I prefer clear tickets, short PRs, and honest retros — but I also appreciate a collaborator who'll push a hotfix while I explain why tabbing is a lifestyle choice.</p>

            <p className="text-white/80">In short: I iterate fast, ask for forgiveness later, and keep the weird bits in this vault. I ship early, clarify later, and treat each project like a living thing that ideally grows into something useful — or at least entertaining.</p>
        </section>
    );
};

export default ProcessRant;
