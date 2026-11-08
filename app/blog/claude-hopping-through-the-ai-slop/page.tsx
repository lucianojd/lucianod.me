'use server';

export default async function Page() {
  return (
    <section id="blog">
      <section id="blog-header">
        <h1>Claude Hopping Through the AI Slop</h1> 
        <h2>Author: Luciano De Gianni</h2>
        <h2>Published: November 7th, 2026</h2>
      </section>
      <section id="blog-content">
      <h1>Introduction</h1>
      <p>
        Claude and its generative AI cousins have been met with a flurry of skepticism, excitement, and curiosity.
        In this article I explore what I find useful as a software engineer working at a tech consulting firm.
        I will primarily focusing on Claude Code, but I will also comment on generative AI and LLMs in general.
      </p>
      <h1>Traversing Repositories I Have Never Read Before</h1>
      <p>
        One of the greatest use cases I have discovered for Claude Code is have it read through repositories I am reading for the first time.
        In my current position, I have been required to support roughly 10 different applications.
        Tackling incidents and feature requests which arrive in a sporadic fashion.
        Claude Code has enabled me do this without franticly combing through the codebase trying to grasp just enough of it to be able to find a solution to the problem at hand.
      </p>
      <p>
        Generating an overview of the codebase and its functionality is generally the first step I take when asked to support an application I am unfamiliar with.
        While hallucinations are always a risk, for general purpose overviews it is reliable enough with both Sonnet 5.5 and Fable 5.1.
        I haven't encountered any egregious hallucinations.
        An overview is also a fairly forgiving task; an overview is always followed up by a more detailed investigation.
        Assigning that follow-up to Claude is where a hallucination becomes more of a concern.
      </p>
      <p>
        Claude's greatest strength by far is its ability to read.
        A codebase or even documentation that would take me 30-60 minutes to read and thoroughly understand can be done by Claude in under 5 minutes.
        Claude can then follow up with a summary or I can have it perform small tasks or code changes based on what it discovers.
        On numerous occasions I have received an incoming incident for a codebase I am unfamiliar with and tasked Claude with diagnosing the problem and applying a fix;
        I have yet to be disappointed by its abilities.
        Combined with git tools in VSCode for reviewing changes it is easy to verify its work for any obvious mistakes.
      </p>
      <p>
        Now, there is the issue of introducing non-obvious bugs.
        You know the kind.
        A race condition, an edge case no one considered, or perhaps null pointer exception that only appears under specific conditions.
        However, to be able to identify these kinds of issues early requires experience and knowledge of the existing codebase.
        Therefore, It would require me to read and work with the repository myself, with or without Claude this risk would still exist.
        To mitigate the risk of introducing an error like this, the time required to learn the codebase would need to be afforded.
        Claude Code does not introduce the risk of merging in a more complex bug itself;
        the risk stems from the original problem which is I need a lot of context in a short amount of time.
      </p>
      <p>
        In conclusion, Claude Code is a powerful bug fixing utility which I use in my day-to-day work.
        It has proven its worth numerous times over.
        I intend to use it as long as my employer is willing to pay for it.
      </p>
      </section>
    </section>
  );
}