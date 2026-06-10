/* ============================================================
   HB 1336 site — Statutory text database
   Sources:
   - Current law: NH General Court, gc.nh.gov (RSA html), retrieved June 2026
   - New / amended language: HB 1336-FN as amended by the Senate
     (05/14/2026 1724s). Added matter is wrapped in <mark> tags;
     removed matter is wrapped in <del> tags.
   Each paragraph carries a data-para id so citations like
   "RSA 540-A:9, II(e)" can scroll to and highlight the
   relevant paragraph.
   ============================================================ */

window.STATUTES = {

  /* ---------------- RSA 540-A:5 ---------------- */
  "540-A:5": {
    title: "RSA 540-A:5 — Definitions",
    chapter: "Title LV · Chapter 540-A — Prohibited Practices and Security Deposits",
    status: "amended",
    statusNote: "Amended by HB 1336-FN §§5–6: paragraph II clarified (advance rent), new paragraph V added (RCD definition). Per OLS conventions, matter added to current law appears in bold italics.",
    source: "https://gc.nh.gov/rsa/html/LV/540-A/540-A-5.htm",
    paras: [
      { id: "intro", html: "As used in this subdivision:" },
      { id: "I", html: "I. “Landlord” means a person and his or its employees, officers or agents who rents or leases to another person a rental unit, including space in a manufactured housing park as regulated by RSA 205-A and in manufactured housing, for other than vacation or recreational purposes. A person who rents or leases a single-family residence and owns no other rental property or who rents or leases rental units in an owner-occupied building of 5 units or less shall not be considered a “landlord” for the purposes of this subdivision, except for any individual unit in such building which is occupied by a person or persons 60 years of age or older." },
      { id: "II", html: "II. “Security deposit” means all funds in excess of the monthly rent which are transferred from the tenant to the landlord for any purpose. <mark>An advance payment of rent is not a security deposit and shall not be required to be held in escrow, trust, or reserve. A landlord may accept advance rent payments provided that such payments are applied to uninterrupted, consecutive rental periods, beginning with the first rental period that has not yet been paid.</mark>" },
      { id: "III", html: "III. “Tenant” means any person who rents or leases residential premises owned by another, including space in a manufactured housing park regulated by RSA 205-A and in manufactured housing, for other than vacation or recreational purposes." },
      { id: "IV", html: "IV. “Rental unit” means each separate part of any residential premises which has full facilities for habitation, including contiguous living, sleeping, kitchen and bathroom facilities, which is held out for rental by the landlord." },
      { id: "V", html: "<mark>V. “Regulated conditional deposit” means an amount accepted by a landlord pursuant to RSA 540-A:9, up to an additional one month’s rent in excess of the limit set forth in RSA 540-A:6, I(a).</mark>" }
    ]
  },

  /* ---------------- RSA 540-A:6 ---------------- */
  "540-A:6": {
    title: "RSA 540-A:6 — Procedure",
    chapter: "Title LV · Chapter 540-A — Prohibited Practices and Security Deposits",
    status: "amended",
    statusNote: "Paragraph I(a) amended by HB 1336-FN §3. Per OLS conventions, matter added to current law appears in bold italics; matter removed appears [bracketed and struck through].",
    source: "https://gc.nh.gov/rsa/html/LV/540-A/540-A-6.htm",
    paras: [
      { id: "I(a)", html: "I. (a) <del>A</del> <mark>Except as provided for in RSA 540-A:9 and RSA 540-A:5, V, a</mark> landlord shall not demand or receive any security deposit in an amount or value in excess of one month’s rent <del>or $100, whichever is greater</del>. Nothing in this section shall prohibit a landlord from entering into a written lease that requires the quarterly or less frequent payment of rent; provided, however, that the security deposit received in addition to the initial rent payment may not exceed the equivalent of one month’s rent." },
      { id: "I(b)", html: "(b) Except as provided in subparagraph (c), upon receiving a deposit from a tenant, a landlord shall forthwith deliver to the tenant a signed receipt stating the amount of the deposit and specifying the place where the deposit or bond for the deposit pursuant to RSA 540-A:6, II(c) will be held, and shall notify the tenant that any conditions in the rental unit in need of repair or correction should be noted on the receipt or given to the landlord in writing within 5 days of occupancy." },
      { id: "I(c)", html: "(c) No receipt shall be required when the tenant furnishes a security deposit in the form of a personal check, a bank check, or a check issued by a government or nonprofit agency on behalf of the tenant. Regardless of whether or not a receipt is required, the landlord shall provide written notice to the tenant that a written list of conditions in the rental unit in need of repair or correction, if any, should be given to the landlord within 5 days of occupancy." },
      { id: "II", html: "II. (a) Security deposits held by a landlord continue to be the money of the tenant and shall be held in trust by the person with whom such deposit is made and shall not be mingled with the personal moneys or become an asset of the landlord until the provisions of RSA 540-A:7 are complied with, but may be disposed of as provided in RSA 540-A:6, III. (b) A landlord may mingle all security deposits held by him in a single account held in trust for the tenant at any bank, savings and loan association or credit union organized under the laws of this state in satisfaction of the requirements of RSA 540-A:6, II(a). (c) A bond written by a company located in New Hampshire and posted with the clerk of the city or town in which the residential premises are located in an amount equivalent to the total value of a security deposit held by the landlord on property in that city or town shall exempt the landlord from the provisions of RSA 540-A:6, II(a) and (b)." },
      { id: "III", html: "III. [Turnover of deposits on conveyance, assignment, foreclosure, or receivership; notice to tenant; relief from liability on compliant transfer. Full text at the source link below.]" },
      { id: "IV", html: "IV. (a) A landlord who holds a security deposit for a period of one year or longer shall pay to the tenant interest on the deposit at a rate equal to the interest rate paid on regular savings accounts in the New Hampshire bank, savings and loan association, or credit union in which it is deposited… (b) Upon request, a landlord shall provide to the tenant the name of any bank… where his security deposit is on deposit, the account number, the amount on deposit, and the interest rate… (c) Notwithstanding RSA 540-A:7, I, a tenant may request the interest accrued on a security deposit every 3 years, 30 days before the expiration of that year’s tenancy. The landlord shall comply with the request within 15 days of the expiration of that year’s tenancy." }
    ]
  },

  /* ---------------- RSA 540-A:7 ---------------- */
  "540-A:7": {
    title: "RSA 540-A:7 — Return of Security Deposit",
    chapter: "Title LV · Chapter 540-A — Prohibited Practices and Security Deposits",
    status: "amended",
    statusNote: "Paragraph I amended by HB 1336-FN §4: new subparagraph I(b) creates the third-party-payor refund mechanism (with the Senate's municipal-welfare safeguard). Per OLS conventions, matter added to current law appears in bold italics.",
    source: "https://gc.nh.gov/rsa/html/LV/540-A/540-A-7.htm",
    paras: [
      { id: "I(a)", html: "I. (a) Except as provided in RSA 540-A:6, IV(c) <mark>and RSA 540-A:7, I(b)</mark>, a landlord shall return a security deposit to a tenant and pay the interest due, if any, within 30 days from the termination of the tenancy. If there are any damages to the premises, excluding reasonable wear and tear, the landlord may deduct the costs of repair from the security deposit. The landlord shall provide the tenant with a written, itemized list of any damages for which the landlord claims the tenant is liable, which shall indicate with particularity the nature of any repair necessary to correct any damage and satisfactory evidence that repair necessary to correct these damages has been or will be completed. Satisfactory evidence may include, but not be limited to, receipts for purchased repair materials and labor estimates, bills or invoices indicating the actual or estimated cost thereof." },
      { id: "I(b)", html: "<mark>(b) If any portion of a security deposit was paid by a third party on behalf of the tenant, the landlord may return any refundable portion of such contribution to the third party in accordance with the third party’s written instructions, provided a copy of such instructions was delivered to the tenant in writing or by electronic communication prior to the commencement of the tenancy. Absent any agreement to the contrary, the landlord shall make any deductions first from tenant-paid funds and second from any known third-party funds. The landlord shall furnish an itemized statement of any deductions from third-party funds within 30 days of a written request by the third party. A landlord who, in good faith, apportions third-party funds in compliance with this section shall be discharged of liability related to such apportionment. Unless otherwise directed by the municipality, any security deposit funds paid by a municipality under RSA 165, together with any interest required by law and less any lawful deductions, shall be returned directly to the municipality within 30 days after termination of the tenancy. A landlord who, in good faith, returns such funds directly to a municipality shall be discharged of liability to any other party for the return of those specific municipal funds.</mark>" },
      { id: "II", html: "II. If the tenant is required under the lease agreement to pay all or part of any increase in real estate taxes levied against the property and becoming due and payable during the term of the lease, or if there is unpaid rent due, or if there are other lawful charges due under the lease which remain unpaid, the landlord may deduct such share of real estate taxes or unpaid rent or unpaid charges from the amount of the security deposit. The landlord shall provide the tenant with a written, itemized list of any claim for unpaid rent or share of real estate taxes or unpaid charges for which the landlord claims the tenant is liable, which shall indicate with particularity the period for which the claim is being made." }
    ]
  },

  /* ---------------- RSA 540-A:8 ---------------- */
  "540-A:8": {
    title: "RSA 540-A:8 — Remedies",
    chapter: "Title LV · Chapter 540-A — Prohibited Practices and Security Deposits",
    status: "amended",
    statusNote: "New subparagraph I(c) added by HB 1336-FN §2: the RCD's Consumer Protection Act enforcement linkage. Per OLS conventions, matter added to current law appears in bold italics.",
    source: "https://gc.nh.gov/rsa/html/LV/540-A/540-A-8.htm",
    paras: [
      { id: "I(a)", html: "I. (a) Any landlord who does not comply with RSA 540-A:6, I, II or III shall be deemed to have violated RSA 358-A:2." },
      { id: "I(b)", html: "(b) Any landlord who does not comply with RSA 540-A:6, IV or RSA 540-A:7 shall be liable to the tenant in damages in an amount equal to twice the sum of the amount of the security deposit plus any interest due under this subdivision, less any payments made and any charges owing for damages, unpaid rent, or share of real estate taxes as specified in RSA 540-A:7." },
      { id: "I(c)", html: "<mark>(c) Any landlord who does not comply with RSA 540-A:9 shall be deemed to have violated RSA 358-A:2 and be subject solely to the remedies set forth in RSA 358-A:10, I.</mark>" },
      { id: "II", html: "II. Notwithstanding RSA 540-A:6, 540-A:7, and 540-A:8, I, a landlord shall not be liable nor forfeit any rights if his failure to comply with said sections and paragraph is due to the failure of the tenant to notify the landlord of his new address upon termination of the tenancy. Any deposits plus interest due on the deposit that remain unclaimed after 6 months from the termination of the tenancy shall become the property of the landlord, free and clear of any claim of the tenant, absent fraud." },
      { id: "III", html: "III. Any provision in any lease or rental agreement by which the tenant is purported to waive any of his rights under this subdivision, except as provided in RSA 540-A:6, III(d), shall be void." }
    ]
  },

  /* ---------------- RSA 540-A:9 (new) ---------------- */
  "540-A:9": {
    title: "RSA 540-A:9 — Regulated Conditional Deposits",
    chapter: "Title LV · Chapter 540-A — new subdivision created by HB 1336-FN §1",
    status: "new",
    statusNote: "Entirely new section created by HB 1336-FN (as amended by the Senate, 05/14/2026 1724s). Effective January 1, 2027.",
    source: "https://gc.nh.gov/bill_status/billinfo.aspx?id=2026&inflect=2",
    paras: [
      { id: "I", html: "I. A regulated conditional deposit shall be treated as part of the security deposit for purposes of RSA 540-A:6 through RSA 540-A:8, except as otherwise specifically provided. Landlords may accept payment of a regulated conditional deposit in installments." },
      { id: "II", html: "II. An applicant may offer, and a landlord may accept or suggest, a regulated conditional deposit if an applicant fails to meet the landlord’s approval criteria, provided that the unmet criteria were disclosed prior to, or concurrently with, the submission of the rental application and payment of any application fees, and further provided that at least one of the following is true:" },
      { id: "II(a)", html: "(a) The applicant’s credit score fails to meet the landlord’s requirements, and the landlord’s minimum credit score requirement does not exceed 650." },
      { id: "II(b)", html: "(b) The applicant’s combined verifiable household gross income from lawful sources, for any size household exceeds 350 percent of the federal poverty guidelines for a household size of 2 as reported annually by the United States Department of Health and Human Services and fails to meet the landlord’s requirements, provided the landlord’s minimum gross income requirement does not exceed 3 times the monthly rent." },
      { id: "II(c)", html: "(c) The applicant fails to meet the landlord’s requirements regarding prior eviction proceedings, excluding cases dismissed without judgment against the applicant and excluding cases where the applicant provides a verifiable decision from the court that clearly states the basis for the eviction was for one of the following reasons: (1) Lead abatement pursuant to RSA 540:2, II(f); (2) Expiration of the lease pursuant to RSA 540:2, II(i); or (3) Other good cause pursuant to RSA 540:2, II(e), where the other good cause was the landlord’s intent to renovate the unit, to remove the unit from the rental market, or to transfer or sell the property absent tenants; the landlord’s intent to lease the unit to relatives; the applicant’s refusal to agree to a rent increase during a prior tenancy; or other reasons that are clearly not due to the fault of the applicant." },
      { id: "II(d)", html: "(d) The applicant fails to meet the landlord’s requirements regarding outstanding unpaid judgments issued within 7 years of the application, unless the applicant verifiably demonstrates that he or she is in compliance with all orders or agreements for periodic payments on the judgments, and has maintained such compliance for the earlier of the preceding 12 months or until the judgments were paid in full." },
      { id: "II(e)", html: "(e) The prospective landlord was unable to verify the present landlord reference and the most recent prior landlord reference." },
      { id: "III", html: "III. Nothing in this section shall be construed to:" },
      { id: "III(a)", html: "(a) Compel a landlord to accept a regulated conditional deposit;" },
      { id: "III(b)", html: "(b) Compel a landlord to approve an applicant who fails to meet their approval criteria; or" },
      { id: "III(c)", html: "(c) Limit a landlord’s ability to set approval criteria at their discretion; provided, however, that a landlord may not accept a regulated conditional deposit on the basis of an approval criterion that is more restrictive than established under RSA 540-A:9, II. If no condition set forth under RSA 540-A:9, II applies, then the limits set forth under RSA 540-A:6, I shall apply." },
      { id: "IV", html: "IV. Prior to accepting a regulated conditional deposit, a landlord shall provide written notice to the applicant specifying the reasons for requiring the regulated conditional deposit, informing the applicant of their right to request a re-screening under RSA 540-A:9, VI and disclosing any fees for re-screening." },
      { id: "V", html: "V. The use of the following notice language, in at least 12-point type, provided prior to accepting a regulated conditional deposit, shall satisfy the notice requirements of RSA 540-A:9, IV: <span class=\"statute-form-note\">[Statutory notice safe-harbor form: restates the RCD definition (RSA 540-A:5, V), provides check-boxes for each of the five conditions in RSA 540-A:9, II(a)–(e), restates the re-screening right under RSA 540-A:9, VI, discloses the re-screening cost, and provides landlord and tenant signature blocks. Full form text in the bill.]</span>" },
      { id: "VI", html: "VI. A tenant who provided a regulated conditional deposit and who has not been in material breach of the lease, including, but not limited to, nonpayment or late payments of monies owed, may submit a written request for re-screening at their own expense no more than once every 6 months in the case of RSA 540-A:9, II(a)-(d), and no more than once in any 12-month period in the case of RSA 540-A:9, II(e). If a tenant establishes that they meet the landlord’s standard rental criteria, the landlord shall, at its option, issue a refund of any regulated conditional deposit or apply any regulated conditional deposit to the tenant’s future rental obligations within 30 days of the tenant’s complete submission for re-screening." },
      { id: "VII", html: "VII. The administrative office of the courts shall, on a quarterly basis, report for each circuit court: (a) The number of writs of summons filed in possessory actions; (b) The number of notices of default and the number of notices of judgments issued in favor of the landlord, each broken out by the grounds for eviction set forth in RSA 540:2, II; and (c) The number of writs of possession issued in possessory actions." }
    ]
  },

  /* ---------------- RSA 540:2 ---------------- */
  "540:2": {
    title: "RSA 540:2 — Termination of Tenancy",
    chapter: "Title LV · Chapter 540 — Actions Against Tenants",
    status: "current",
    statusNote: "Current law (not amended by HB 1336-FN). The RCD's no-fault eviction carve-outs cross-reference the grounds in paragraph II.",
    source: "https://gc.nh.gov/rsa/html/LV/540/540-2.htm",
    paras: [
      { id: "I", html: "I. The lessor or owner of nonrestricted property may terminate any tenancy by giving to the tenant or occupant a notice in writing to quit the premises in accordance with RSA 540:3 and 5." },
      { id: "II", html: "II. The lessor or owner of restricted property may terminate any tenancy by giving to the tenant or occupant a notice in writing to quit the premises in accordance with RSA 540:3 and 5, but only for one of the following reasons:" },
      { id: "II(a)", html: "(a) Neglect or refusal to pay rent due and in arrears, upon demand." },
      { id: "II(b)", html: "(b) Substantial damage to the premises by the tenant, members of his household, or guests." },
      { id: "II(c)", html: "(c) Failure of the tenant to comply with a material term of the lease." },
      { id: "II(d)", html: "(d) Behavior of the tenant or members of his family which adversely affects the health or safety of the other tenants or the landlord or his representatives, or failure of the tenant to accept suitable temporary relocation due to lead-based paint hazard abatement, as set forth in RSA 130-A:8-a, I." },
      { id: "II(e)", html: "(e) Other good cause." },
      { id: "II(f)", html: "(f) The dwelling unit contains a lead exposure-hazard which the owner will abate by: (1) Methods other than interim controls or encapsulation; (2) Any other method which can reasonably be expected to take more than 30 days to perform; or (3) Removing the dwelling unit from the residential rental market." },
      { id: "II(g)", html: "(g) Willful failure by the tenant to prepare the unit for remediation of an infestation of insects or rodents, including bed bugs, after receipt of reasonable written notice of the required preparations and reasonable time to complete them." },
      { id: "II(h)", html: "(h) If a remaining cotenant or occupant is the accused perpetrator of domestic violence, sexual assault, or stalking, resulting in the termination of a lease pursuant to RSA 540:11-b." },
      { id: "II(i)", html: "<em>[Paragraph II(i) effective July 1, 2026.]</em> (i)(1) For a lease the original term of which is 12 months or longer, or for a lease the term of which is less than 12 months but which has been renewed for a total period of 12 months or longer, the expiration of the term of the lease, provided that: (A) The landlord has provided the tenant with written notice at least 60 days in advance of the termination date of the lease term that the lease will not be renewed and that the tenant must vacate the rental property at the end of the lease term; and (B) The landlord has filed a possessory action within 6 months of the lease expiring. (2) Nothing in this subparagraph shall affect a tenant’s defense of retaliatory eviction as set forth in RSA 540:13-a or a tenant’s protections from discrimination as defined by RSA 354:10." },
      { id: "III", html: "III. If the grounds for eviction is other good cause as set forth in paragraph II(e) of this section, and such cause is based on the actions or inactions of the tenant, members of his family, or guests, the landlord shall, prior to the issuance of the eviction notice, provide the tenant with written notice stating that in the future such actions or inactions would constitute grounds for eviction…" },
      { id: "IV", html: "IV. A tenant’s refusal to agree to a change in the existing rental agreement calling for an increase in the amount of rent shall constitute good cause for eviction under paragraph II(e) of this section, provided that the landlord provided the tenant with written notice of the amount and effective date of the rent increase at least 30 days prior to the effective date of the increase." },
      { id: "V", html: "V. “Other good cause” as set forth in paragraph II(e) of this section includes, but is not limited to, any legitimate business or economic reason and need not be based on the action or inaction of the tenant, members of his family, or guests." },
      { id: "VIII", html: "<em>[Paragraph VIII effective July 1, 2026.]</em> VIII. No-fault termination of tenancy shall not be considered an eviction for the purposes of rental applications and tenant screening reports by the lessor or the lessee. For the purposes of this section, “no-fault termination of tenancy” shall mean any termination of tenancy under RSA 540:2, II(i). The court handling any no-fault termination of tenancy shall make note in court documentation of the termination of tenancy proceeding that the termination of tenancy was at no fault of the tenant… <span class=\"statute-form-note\">[Paragraphs VI–VII (utility-payment defense; domestic-violence protections) omitted here; full text at the source link.]</span>" }
    ]
  },

  /* ---------------- RSA 358-A:2 ---------------- */
  "358-A:2": {
    title: "RSA 358-A:2 — Acts Unlawful",
    chapter: "Title XXXI · Chapter 358-A — Regulation of Business Practices for Consumer Protection",
    status: "current",
    statusNote: "Current law (not amended by HB 1336-FN). Under new RSA 540-A:8, I(c), a landlord who does not comply with RSA 540-A:9 is deemed to have violated this section.",
    source: "https://gc.nh.gov/rsa/html/XXXI/358-A/358-A-2.htm",
    paras: [
      { id: "intro", html: "It shall be unlawful for any person to use any unfair method of competition or any unfair or deceptive act or practice in the conduct of any trade or commerce within this state. Such unfair method of competition or unfair or deceptive act or practice shall include, but is not limited to, the following: <span class=\"statute-form-note\">[The section then enumerates nineteen categories of unlawful acts (paragraphs I–XIX), including passing off goods or services as those of another, deceptive representations, false advertising, and other unfair or deceptive practices. The enumerated list is illustrative, not exhaustive — the chapeau above is the operative prohibition that RCD noncompliance is deemed to violate. Full list at the source link.]</span>" }
    ]
  },

  /* ---------------- RSA 358-A:10 ---------------- */
  "358-A:10": {
    title: "RSA 358-A:10 — Private Actions",
    chapter: "Title XXXI · Chapter 358-A — Regulation of Business Practices for Consumer Protection",
    status: "current",
    statusNote: "Current law (not amended by HB 1336-FN). These are the remedies — statutory damages, multiple damages for willful violations, costs and attorneys' fees — that apply to RCD misuse via RSA 540-A:8, I(c).",
    source: "https://gc.nh.gov/rsa/html/XXXI/358-A/358-A-10.htm",
    paras: [
      { id: "I", html: "I. Any person injured by another’s use of any method, act or practice declared unlawful under this chapter may bring an action for damages and for such equitable relief, including an injunction, as the court deems necessary and proper. If the court finds for the plaintiff, recovery shall be in the amount of actual damages or $1,000, whichever is greater. If the court finds that the use of the method of competition or the act or practice was a willful or knowing violation of this chapter, it shall award as much as 3 times, but not less than 2 times, such amount. In addition, a prevailing plaintiff shall be awarded the costs of the suit and reasonable attorney’s fees, as determined by the court. Any attempted waiver of the right to the damages set forth in this paragraph shall be void and unenforceable. Injunctive relief shall be available to private individuals under this chapter without bond, subject to the discretion of the court." },
      { id: "II", html: "II. Upon commencement of any action brought under this section, the clerk of the court shall mail a copy of the complaint or other initial pleadings to the attorney general and, upon entry of any judgment or decree in the action, shall mail a copy of such judgment or decree to the attorney general." }
    ]
  },

  /* ---------------- RSA 165 ---------------- */
  "165": {
    title: "RSA 165:1 — Who Entitled; Local Responsibility",
    chapter: "Title XII · Chapter 165 — Aid to Assisted Persons (municipal welfare)",
    status: "current",
    statusNote: "Current law (not amended by HB 1336-FN). RSA 165 is New Hampshire's municipal general-assistance chapter; the Senate amendment to RSA 540-A:7, I(b) directs that municipal security-deposit funds paid under this chapter return to the municipality.",
    source: "https://gc.nh.gov/rsa/html/XII/165/165-1.htm",
    paras: [
      { id: "I", html: "I. Whenever a person in any town is poor and unable to support himself, he shall be relieved and maintained by the overseers of public welfare of such town, whether or not he has residence there. For the purposes of this chapter the term “residence” shall have the same definition as in RSA 21:6-a." },
      { id: "II", html: "II. The local governing body, as defined in RSA 672:6, of every town and city in the state shall adopt written guidelines relative to general assistance. The guidelines shall include, but not be limited to, the following: (a) The process for application for general assistance. (b) The criteria for determining eligibility. (c) The process for appealing a decision relative to the granting of general assistance. (d) The process for the application of rents under RSA 165:4-b, if the municipality uses the offset provisions of RSA 165:4-a. (e) A statement that qualified state assistance reductions under RSA 167:82, VIII may be deemed as income…" },
      { id: "III", html: "III. Whenever a town provides assistance under this section, no such assistance shall be provided directly to a person or household in the form of cash payments." }
    ]
  },

  /* ---------------- Chapter-level entries ---------------- */
  "540-A": {
    title: "RSA Chapter 540-A — Prohibited Practices and Security Deposits",
    chapter: "Title LV · Proceedings in Special Cases",
    status: "chapter",
    statusNote: "Chapter overview. HB 1336-FN amends RSA 540-A:5, 540-A:6, 540-A:7, and 540-A:8, and inserts a new subdivision at RSA 540-A:9.",
    source: "https://gc.nh.gov/rsa/html/NHTOC/NHTOC-LV-540-A.htm",
    paras: [
      { id: "overview", html: "Chapter 540-A governs prohibited landlord and tenant practices and the security-deposit framework: <strong>540-A:5</strong> (definitions — amended), <strong>540-A:6</strong> (procedure and the one-month cap — amended), <strong>540-A:7</strong> (return of deposit — amended; new third-party-payor mechanism), <strong>540-A:8</strong> (remedies — new CPA linkage for RCDs), and new <strong>540-A:9</strong> (Regulated Conditional Deposits). Click any specific section citation in the text for its full language." }
    ]
  },

  "358-A": {
    title: "RSA Chapter 358-A — Regulation of Business Practices for Consumer Protection",
    chapter: "Title XXXI · Trade and Commerce",
    status: "chapter",
    statusNote: "Chapter overview (the New Hampshire Consumer Protection Act). Not amended by HB 1336-FN.",
    source: "https://gc.nh.gov/rsa/html/NHTOC/NHTOC-XXXI-358-A.htm",
    paras: [
      { id: "overview", html: "Chapter 358-A is New Hampshire’s Consumer Protection Act. The provisions relevant to HB 1336-FN are <strong>358-A:2</strong> (the prohibition on unfair or deceptive acts, which RCD noncompliance is deemed to violate via RSA 540-A:8, I(c)) and <strong>358-A:10, I</strong> (private actions: actual damages or $1,000, whichever is greater; 2–3× damages for willful or knowing violations; plus costs and reasonable attorneys’ fees)." }
    ]
  },

  /* ---------------- Full bill text ---------------- */
  "HB1336": {
    title: "HB 1336-FN — Full bill text, as amended",
    chapter: "2026 Session · 26-2931 — as amended by the House (0763h, 1100h) and the Senate (1724s)",
    status: "new",
    statusNote: "The complete operative text of the bill awaiting the Governor's signature, incorporating both House floor amendments and the Senate Commerce amendment. Effective January 1, 2027.",
    source: "https://gc.nh.gov/bill_status/billinfo.aspx?id=2026&inflect=2",
    paras: [
      { id: "1", html: "<strong>Section 1 — New Subdivision; Regulated Conditional Deposits.</strong> Amend RSA 540-A by inserting after section 8 the following new subdivision:<br><em>Regulated Conditional Deposits</em><br><strong>540-A:9 Regulated Conditional Deposits.</strong>" },
      { id: "1.I", html: "I. A regulated conditional deposit shall be treated as part of the security deposit for purposes of RSA 540-A:6 through RSA 540-A:8, except as otherwise specifically provided. Landlords may accept payment of a regulated conditional deposit in installments." },
      { id: "1.II", html: "II. An applicant may offer, and a landlord may accept or suggest, a regulated conditional deposit if an applicant fails to meet the landlord’s approval criteria, provided that the unmet criteria were disclosed prior to, or concurrently with, the submission of the rental application and payment of any application fees, and further provided that at least one of the following is true: (a) The applicant’s credit score fails to meet the landlord’s requirements, and the landlord’s minimum credit score requirement does not exceed 650. (b) The applicant’s combined verifiable household gross income from lawful sources, for any size household exceeds 350 percent of the federal poverty guidelines for a household size of 2 as reported annually by the United States Department of Health and Human Services and fails to meet the landlord’s requirements, provided the landlord’s minimum gross income requirement does not exceed 3 times the monthly rent. (c) The applicant fails to meet the landlord’s requirements regarding prior eviction proceedings, excluding cases dismissed without judgment against the applicant and excluding cases where the applicant provides a verifiable decision from the court that clearly states the basis for the eviction was for one of the following reasons: (1) Lead abatement pursuant to RSA 540:2, II(f); (2) Expiration of the lease pursuant to RSA 540:2, II(i); or (3) Other good cause pursuant to RSA 540:2, II(e), where the other good cause was the landlord’s intent to renovate the unit, to remove the unit from the rental market, or to transfer or sell the property absent tenants; the landlord’s intent to lease the unit to relatives; the applicant’s refusal to agree to a rent increase during a prior tenancy; or other reasons that are clearly not due to the fault of the applicant. (d) The applicant fails to meet the landlord’s requirements regarding outstanding unpaid judgments issued within 7 years of the application, unless the applicant verifiably demonstrates that he or she is in compliance with all orders or agreements for periodic payments on the judgments, and has maintained such compliance for the earlier of the preceding 12 months or until the judgments were paid in full. (e) The prospective landlord was unable to verify the present landlord reference and the most recent prior landlord reference." },
      { id: "1.III", html: "III. Nothing in this section shall be construed to: (a) Compel a landlord to accept a regulated conditional deposit; (b) Compel a landlord to approve an applicant who fails to meet their approval criteria; or (c) Limit a landlord’s ability to set approval criteria at their discretion; provided, however, that a landlord may not accept a regulated conditional deposit on the basis of an approval criterion that is more restrictive than established under RSA 540-A:9, II. If no condition set forth under RSA 540-A:9, II applies, then the limits set forth under RSA 540-A:6, I shall apply." },
      { id: "1.IV", html: "IV. Prior to accepting a regulated conditional deposit, a landlord shall provide written notice to the applicant specifying the reasons for requiring the regulated conditional deposit, informing the applicant of their right to request a re-screening under RSA 540-A:9, VI and disclosing any fees for re-screening." },
      { id: "1.V", html: "V. The use of the following notice language, in at least 12-point type, provided prior to accepting a regulated conditional deposit, shall satisfy the notice requirements of RSA 540-A:9, IV: <span class=\"statute-form-note\">[Statutory notice safe-harbor form: restates the RCD definition (RSA 540-A:5, V), provides check-boxes for each of the five conditions in RSA 540-A:9, II(a)–(e), restates the re-screening right under RSA 540-A:9, VI, discloses the re-screening cost, and provides landlord and tenant signature blocks.]</span>" },
      { id: "1.VI", html: "VI. A tenant who provided a regulated conditional deposit and who has not been in material breach of the lease, including, but not limited to, nonpayment or late payments of monies owed, may submit a written request for re-screening at their own expense no more than once every 6 months in the case of RSA 540-A:9, II(a)-(d), and no more than once in any 12-month period in the case of RSA 540-A:9, II(e). If a tenant establishes that they meet the landlord’s standard rental criteria, the landlord shall, at its option, issue a refund of any regulated conditional deposit or apply any regulated conditional deposit to the tenant’s future rental obligations within 30 days of the tenant’s complete submission for re-screening." },
      { id: "1.VII", html: "VII. The administrative office of the courts shall, on a quarterly basis, report for each circuit court: (a) The number of writs of summons filed in possessory actions; (b) The number of notices of default and the number of notices of judgments issued in favor of the landlord, each broken out by the grounds for eviction set forth in RSA 540:2, II; and (c) The number of writs of possession issued in possessory actions." },
      { id: "2", html: "<strong>Section 2 — Remedies.</strong> Amend RSA 540-A:8, I by inserting after subparagraph (b) the following new subparagraph: <mark>(c) Any landlord who does not comply with RSA 540-A:9 shall be deemed to have violated RSA 358-A:2 and be subject solely to the remedies set forth in RSA 358-A:10, I.</mark>" },
      { id: "3", html: "<strong>Section 3 — Procedure.</strong> Amend RSA 540-A:6, I(a) to read as follows: I.(a) <del>A</del> <mark>Except as provided for in RSA 540-A:9 and RSA 540-A:5, V, a</mark> landlord shall not demand or receive any security deposit in an amount or value in excess of one month’s rent <del>or $100, whichever is greater</del>. Nothing in this section shall prohibit a landlord from entering into a written lease that requires the quarterly or less frequent payment of rent; provided, however, that the security deposit received in addition to the initial rent payment may not exceed the equivalent of one month’s rent." },
      { id: "4", html: "<strong>Section 4 — Return of Security Deposit.</strong> Amend RSA 540-A:7, I to read as follows: I.(a) Except as provided in RSA 540-A:6, IV(c) <mark>and RSA 540-A:7, I(b)</mark>, a landlord shall return a security deposit to a tenant and pay the interest due, if any, within 30 days from the termination of the tenancy… <mark>(b) If any portion of a security deposit was paid by a third party on behalf of the tenant, the landlord may return any refundable portion of such contribution to the third party in accordance with the third party’s written instructions, provided a copy of such instructions was delivered to the tenant in writing or by electronic communication prior to the commencement of the tenancy. Absent any agreement to the contrary, the landlord shall make any deductions first from tenant-paid funds and second from any known third-party funds. The landlord shall furnish an itemized statement of any deductions from third-party funds within 30 days of a written request by the third party. A landlord who, in good faith, apportions third-party funds in compliance with this section shall be discharged of liability related to such apportionment. Unless otherwise directed by the municipality, any security deposit funds paid by a municipality under RSA 165, together with any interest required by law and less any lawful deductions, shall be returned directly to the municipality within 30 days after termination of the tenancy. A landlord who, in good faith, returns such funds directly to a municipality shall be discharged of liability to any other party for the return of those specific municipal funds.</mark>" },
      { id: "5", html: "<strong>Section 5 — Definitions.</strong> Amend RSA 540-A:5, II to read as follows: II. “Security deposit” means all funds in excess of the monthly rent which are transferred from the tenant to the landlord for any purpose. <mark>An advance payment of rent is not a security deposit and shall not be required to be held in escrow, trust, or reserve. A landlord may accept advance rent payments provided that such payments are applied to uninterrupted, consecutive rental periods, beginning with the first rental period that has not yet been paid.</mark>" },
      { id: "6", html: "<strong>Section 6 — New Paragraph; Definitions.</strong> Amend RSA 540-A:5 by inserting after paragraph IV the following new paragraph: <mark>V. “Regulated conditional deposit” means an amount accepted by a landlord pursuant to RSA 540-A:9, up to an additional one month’s rent in excess of the limit set forth in RSA 540-A:6, I(a).</mark>" },
      { id: "7", html: "<strong>Section 7 — Effective Date.</strong> This act shall take effect January 1, 2027." }
    ]
  }
};

/* Order of entries in the Statute Reader's quick-nav menu */
window.STATUTE_ORDER = ["HB1336", "540-A:9", "540-A:5", "540-A:6", "540-A:7", "540-A:8", "540-A", "540:2", "358-A:2", "358-A:10", "358-A", "165"];
