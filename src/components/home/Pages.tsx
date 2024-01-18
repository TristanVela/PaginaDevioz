import React, { useState } from "react";
import { Projects } from "../../interfaces/data";

interface ProjectsI {
  data: Projects[];
}

export const Pages = ({ data }: ProjectsI) => {
  const firstSection = data.map((project) => project.name_project)[0];
  const [sectionSelected, setSectionSelected] = useState(firstSection);

  const onSectionSelected = (section: string) => {
    setSectionSelected(section);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full mt-20 gap-y-10 ">
      <h2 className="text-5xl font-bold text-center">Nuestros proyectos</h2>
      <div className="flex flex-wrap items-center justify-center gap-8 px-4">
        {data.map((project, index) => (
          <button
            type="button"
            key={index}
            className={`uppercase relative text-[0.8rem] hover:text-[#070f26] transition-all duration-300`}
            onClick={() => onSectionSelected(project.name_project)}
          >
            {project.name_project}
            {sectionSelected === project.name_project && (
              <div className="absolute  left-0 right-0 -bottom-1 h-1 bg-[#070f26]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid w-full grid-cols-1 gap-12 mt-4 cursor-pointer px-14 lg:grid-cols-4 justify-items-center md:grid-cols-3 sm:grid-cols-2">
        {/* Card */}
        {data.map((project, index) => {
          return (
            <React.Fragment key={index}>
              {project.list_projects.map(
                (proj, innerIndex) =>
                  sectionSelected === project.name_project && (
                    <div
                      key={innerIndex}
                      className="flex flex-col items-center justify-center gap-8 animate__animated animate__zoomIn animate__faster"
                    >
                      <div className="transition-all duration-300 shadow-md hover:shadow-2xl hover:scale-105">
                        <img
                          src={proj.cover}
                          alt={proj.name}
                          className="max-h-[200px] h-[200px] w-[300px]"
                        />
                      </div>
                      <span className="text-xl">{proj.name}</span>
                    </div>
                  )
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
