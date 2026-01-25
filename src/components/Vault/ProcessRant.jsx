import PropTypes from 'prop-types';

const ProcessRant = ({ yellowAccent }) => {
    return (
        <section className="mt-8 p-6 md:p-8 bg-black border-2 rounded-md" style={{ borderColor: yellowAccent }}>
            <h3 className="font-black uppercase text-white tracking-widest mb-3">how i actually build things</h3>

            <p className="text-white/85 mb-3">
                Okay, real talk: I get an idea, start typing, panic for a bit, overthink everything, text someone til they lose it too, then just ship. 
                Sometimes it breaks, sometimes it works… honestly, it&apos;s mostly witchcraft. Welcome to my vault of 
                chaos, enjoy the show.
            </p>

            <p className="text-white/80 mb-2">
                My workflow? Ha. Idea pops up, I doodle two terrible diagrams (this does absolutely nothing), open a repo, and immediately make ten 
                commmits because free will. I prototype like a mad scientist at 2am, fueled by weird playlists and 
                questionable snacks. Tests happen… sometimes. Sometimes they don&apos;t. It&apos;s complicated.
            </p>

            <p className="text-white/80 mb-2">
                Collaborating is like juggling flaming swords: I ping teammates randomly while they are all asleep (i need to be sleeping too but meh) that&apos;s mostly 
                stickers, I survive code reviews like therapy sessions, and yes, I appreciate someone who&apos;ll push a hotfix 
                while I rant about why tabbing is a lifestyle choice.
            </p>

            <p className="text-white/80">
                Basically, I iterate fast, apologize never, and hoard the weird bits in this vault. Ship early, laugh later, 
                repeat. Oh, and if anyone even mentions the word <span className="text-yellow-400">consistency</span>, 
                You bet i WILL lose it.
            </p>
        </section>
    );
};

export default ProcessRant;

ProcessRant.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
