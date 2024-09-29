// @flow strict

import { CardMovingBorder } from "../ui/BorderShineCard";

function GitStats() {
  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <CardMovingBorder duration={10000} borderClassName="w-12 sm:w-[200px]">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=ashikur540&theme=algolia`}
            width={1080}
            height={520}
            alt="github profile-details"
            className="rounded-lg "
          />
        </CardMovingBorder>
      </div>

      <div className="col-span-12 md:col-span-4">
        {/* <CardMovingBorder duration={10000} borderClassName="w-12 sm:w-[200px]">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=ashikur540&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true`}
            width={1080}
            height={520}
            alt="github stats"
          />
        </CardMovingBorder> */}

        {/* <div>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=ashikur540&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&hide=stars,commits,prs,issues,contribs`}
            width={1080}
            height={520}
            alt="github stats"
            className="rounded-lg"
          />
        </div> */}
        <CardMovingBorder duration={10000} borderClassName="w-12 sm:w-[200px]">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=ashikur540&theme=algolia`}
            width={1080}
            height={400}
            alt="github repos-per-language"
            className="rounded-lg  w-full"
          />
        </CardMovingBorder>
      </div>
    </>
  );
}

export default GitStats;
