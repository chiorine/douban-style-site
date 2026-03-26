with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# Locate the old "标签" section (which uses siteTagCounts + TagList)
# and the old "日记标签" section (which has no bottom link)
# Replace both with: "广播标签" section + "日记标签" section (with bottom links)

old_tag_section = """                        <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  标签
                </h2>
              </div>
              <div className="mt-4">
                <TagList tags={siteTagCounts} basePath="/notes" />
              </div>
            </section>

                                                <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  日记标签
                </h2>
              </div>
              {noteTagCounts.length === 0 ? (
                <p className="mt-4 text-sm text-stone-400">暂无标签。</p>
              ) : (
                <ul className="mt-4 space-y-3 text-sm text-stone-600">
                  {noteTagCounts.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <Link
                        href={`/notes?tag=${encodeURIComponent(item.name)}`}
                        className="transition hover:text-emerald-700"
                      >
                        {item.name}
                      </Link>
                      <span className="text-stone-400">{item.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>"""

new_tag_sections = """            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  广播标签
                </h2>
              </div>
              {broadcastTagCounts.length === 0 ? (
                <p className="mt-4 text-sm text-stone-400">暂无标签。</p>
              ) : (
                <ul className="mt-4 space-y-3 text-sm text-stone-600">
                  {broadcastTagCounts.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <Link
                        href={`/broadcast?tag=${encodeURIComponent(item.name)}`}
                        className="transition hover:text-emerald-700"
                      >
                        {item.name}
                      </Link>
                      <span className="text-stone-400">{item.count}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 border-t border-stone-100 pt-3">
                <Link
                  href="/broadcast"
                  className="text-sm text-emerald-700 hover:text-emerald-800"
                >
                  更多广播标签 →
                </Link>
              </div>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  日记标签
                </h2>
              </div>
              {noteTagCounts.length === 0 ? (
                <p className="mt-4 text-sm text-stone-400">暂无标签。</p>
              ) : (
                <ul className="mt-4 space-y-3 text-sm text-stone-600">
                  {noteTagCounts.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <Link
                        href={`/notes?tag=${encodeURIComponent(item.name)}`}
                        className="transition hover:text-emerald-700"
                      >
                        {item.name}
                      </Link>
                      <span className="text-stone-400">{item.count}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 border-t border-stone-100 pt-3">
                <Link
                  href="/notes"
                  className="text-sm text-emerald-700 hover:text-emerald-800"
                >
                  更多日记标签 →
                </Link>
              </div>
            </section>"""

if old_tag_section in c:
    c = c.replace(old_tag_section, new_tag_sections)
    print("JSX sections replaced OK")
else:
    print("ERROR: old section not found")
    # Debug: find where 标签 appears
    import re
    for m in re.finditer("标签", c):
        print("  found at", m.start(), repr(c[m.start()-50:m.start()+50]))

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(c)
